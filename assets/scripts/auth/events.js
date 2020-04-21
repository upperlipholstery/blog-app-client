'user strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('../ui')

function onSignUp (event) {
  event.preventDefault()
  const data = getFormFields($('#sign-up')[0])
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

function onSignIn (event) {
  event.preventDefault()
  const data = getFormFields($('#sign-in')[0])
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

module.exports = {
  onSignUp,
  onSignIn
}
