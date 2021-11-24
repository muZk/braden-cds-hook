const express = require('express')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')
const cors = require('cors')
const { getBradenAssessmentPanel } = require('./fhir')
const { getCardDetail, getCardIndicator, getCardSuggestions } = require('./card-utils')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())

const LPP_SERVICE = {
  name: 'LPP CDS Hook Demo',
  title: 'LPP CDS Hook Demo',
  id: 'lpp-prevention-recommendations',
  description: 'Provide recommendations for patients at risk of pressure injuries',
  hook: 'patient-view'
}

const SERVICES = {
  services: [
    LPP_SERVICE
  ]
}

app.get('/cds-services', (req, res) => {
  res.send(SERVICES)
})

app.get('/', (req, res) => {
  res.send('LPP CDS Hook Running!')
})

app.post(`/cds-services/${LPP_SERVICE.id}`, asyncHandler(async (req, res) => {
  const { fhirServer, context: { patientId } } = req.body

  const panel = await getBradenAssessmentPanel(fhirServer, patientId)

  if (!panel) {
    return res.send(null)
  }

  const scoreObservation = panel.contained.find(observation => observation.code.coding[0].code === '38227-5')
  const score = scoreObservation.valueQuantity.value
  const risk = (score <= 12 && 'high') || (score <= 14 && 'moderate') || 'low'

  const response = {
    cards: [
      {
        summary: 'Riesgo de aparición de úlceras por presión',
        detail: getCardDetail(risk),
        indicator: getCardIndicator(risk),
        source: {
          label: 'Protocolo prevención de úlceras por presión',
          url: 'http://200.72.129.100/transparencia/transparencia_activa/documentos/matroneria/protocolo_prevencion_ulceras_por_presion.pdf'
        },
        suggestions: getCardSuggestions(risk)
      }
    ]
  }

  res.send(response)
}))

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
