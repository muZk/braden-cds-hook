const SUGGESTIONS = {
  low: [
    'Estimular movilización en cama',
    'Lubricar piel 1 vez al día con crema hidratante'
  ],
  moderate: [
    'Cambios de posición cada 4 horas',
    'Lubricar piel 2 veces al día con crema hidratante'
  ],
  high: [
    'Colchón de flotación',
    'Cambios de posición cada 2 horas',
    'Lubricar piel 2 veces al día con crema hidratante'
  ]
}

const DETAIL = {
  low: 'Según la escala de Braden, paciente tiene un **riesgo bajo** de UPP',
  moderate: 'Según la escala de Braden, paciente tiene un **riesgo moderado** de UPP',
  high: 'Según la escala de Braden, paciente tiene un **riesgo alto** de UPP.'
}

const INDICATOR = {
  low: 'info',
  moderate: 'warning',
  high: 'critical'
}

exports.getCardSuggestions = (risk) => {
  return SUGGESTIONS[risk].map(label => ({ label }))
}

exports.getCardDetail = (risk) => {
  return DETAIL[risk]
}

exports.getCardIndicator = (risk) => {
  return INDICATOR[risk]
}
