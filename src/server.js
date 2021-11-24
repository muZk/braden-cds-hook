const express = require('express')

const app = express()
const PORT = process.env.PORT || 5000

const BREDAN_SERVICE = {
  name: 'Bredan CDS Hook Demo',
  title: 'Bredan CDS Hook Demo',
  id: 'bredan-prescribe',
  description: 'Provide recommendations for patients at risk of pressure injuries',
  hook: 'patient-view'
}

const SERVICES = {
  services: [
    BREDAN_SERVICE
  ]
}

app.get('/cds-services', (req, res) => {
  res.send(SERVICES)
})

app.get('/', (req, res) => {
  res.send('Braden CDS Hook Running!')
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
