exports.getBradenAssessmentPanel = async function getBradenAssessmentPanel (patientId) {
  const examples = [
    require('./examples/high-risk.json'),
    require('./examples/low-risk.json'),
    require('./examples/moderate-risk.json')
  ]
  return examples[Math.floor(Math.random() * examples.length)]
}
