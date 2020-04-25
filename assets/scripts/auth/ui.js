'use strict'

const store = require('./store')
const api = require('./auth/api')

function signUpSuccess (data) {
  console.log(data)
  store.user = data.user
  // api.signIn(data)
  //   .then(signInSuccess)
  //   .catch(signInFailure)
  console.log('signUp working')
}

function signInSuccess (data) {
  store.user = data.user
  $('#regsidebar').removeClass('hidden')
  $('#unregsidebar').addClass('hidden')
}

function signOutSuccess () {
  console.log('sign out is working')
  $('#unregsidebar').removeClass('hidden')
  $('#regsidebar').addClass('hidden')
  $('#create-comment-menu').addClass('hidden')
  $('#create-post-menu').addClass('hidden')
  $('#content').html('')
  store.user = undefined
}
function signUpFailure () {
  console.log('signUp failed')
}

function signInFailure () {
  console.log('sign in failed')
}

function signOutFailure () {
  console.log('sign out failed')
}

function changePasswordSuccess () {
  console.log('change password working')
}

function changePasswordFailure () {
  console.log('change password failed')
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  signInFailure,
  signUpFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
