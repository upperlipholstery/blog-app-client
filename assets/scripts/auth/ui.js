'use strict'

const store = require('../store')
// const api = require('./api')

function signUpSuccess (data) {
  console.log(data)
  store.user = data.user
  // api.signIn(data)
  //   .then(signInSuccess)
  //   .catch(signInFailure)
  console.log('signUp working')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

function signInSuccess (data) {
  store.user = data.user
  $('#regsidebar').removeClass('hidden')
  $('#unregsidebar').addClass('hidden')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

function signOutSuccess () {
  console.log('sign out is working')
  $('#unregsidebar').removeClass('hidden')
  $('#regsidebar').addClass('hidden')
  $('#create-comment-menu').addClass('hidden')
  $('#create-post-menu').addClass('hidden')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  $('#content').html('')
  store.user = undefined
}
function signUpFailure () {
  console.log('signUp failed')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

function signInFailure () {
  console.log('sign in failed')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

function signOutFailure () {
  console.log('sign out failed')
}

function changePasswordSuccess () {
  console.log('change password working')
  $('form input[type="password"]').val('')
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
