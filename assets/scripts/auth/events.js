'user strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

function onSignUp (event) {
  event.preventDefault()
  const data = getFormFields($('#sign-up')[0])
  store.userPassword = data.credentials.password
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

function onSignOut (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

function onChangePassword (event) {
  event.preventDefault()
  const data = getFormFields($('#change-password')[0])
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut
}
