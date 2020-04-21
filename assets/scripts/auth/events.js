'user strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('../ui')

function onSignUp (event) {
  event.preventDefault()
  console.log('1')
  const data = getFormFields($('#sign-up')[0])
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

module.exports = {
  onSignUp
}
