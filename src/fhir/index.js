const fetch = require('node-fetch')

const BRADEN_ASSESSMENT_PANNEL_CODE = 'http://loinc.org|38228-3'

const buildBradenPanelURL = (fhirServer, patientId) =>
  `${fhirServer}/DiagnosticReport?patient=${patientId}&code=${BRADEN_ASSESSMENT_PANNEL_CODE}&_sort:desc=date&_count=1`

function buildMockResponse () {
  const examples = [
    require('./examples/high-risk.json'),
    require('./examples/low-risk.json'),
    require('./examples/moderate-risk.json')
  ]
  return examples[Math.floor(Math.random() * examples.length)]
}

exports.getBradenAssessmentPanel = async function getBradenAssessmentPanel (fhirServer, patientId) {
  if (!fhirServer) {
    return buildMockResponse()
  }

  const response = await fetch(buildBradenPanelURL(fhirServer, patientId))

  if (response.ok) {
    const bundleJson = await response.json()

    if (bundleJson.total === 0) {
      return null
    }

    return bundleJson.entry[0].resource
  }

  return null
}
