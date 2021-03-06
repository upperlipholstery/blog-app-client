'use strict'

const store = require('../store')
const api = require('./api')
const avatarTemplate = require('../templates/avatar-template.handlebars')

function signUpSuccess (data) {
  store.user = data.user
  const signInData = { credentials: {
    email: data.user.email,
    password: store.userPassword
  }
  }
  api.signIn(signInData)
    .then(signInSuccess)
    .catch(signInFailure)
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

function signInSuccess (data) {
  store.user = data.user
  $('#regsidebar').removeClass('hidden')
  $('#unregsidebar').addClass('hidden')
  $('#tomes-message').addClass('hidden')
  $('#content').html('')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  const avatarHtml = avatarTemplate({ user: data.user })
  $('.logo2').html(avatarHtml)
  $('#user-message').html('<a href="https://github.com/ArKaneVision" target="_blank">Kane Two Feathers</a> & <a href="https://github.com/taharon" target="_blank">Tal Aharon</a>')
}

function signOutSuccess () {
  $('#unregsidebar').removeClass('hidden')
  $('#regsidebar').addClass('hidden')
  $('#create-note-menu').addClass('hidden')
  $('#create-tome-menu').addClass('hidden')
  $('.account-page').addClass('hidden')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  $('#content').html('')
  store.user = undefined
}
function signUpFailure (data) {
  $('#tomes-message').removeClass('hidden')
  if (data.status === 409) {
    $('#tomes-message').text('Username Taken')
  } else {
    $('#tomes-message').text('Error on Sign Up')
  }
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

function signInFailure () {
  $('#tomes-message').removeClass('hidden')
  $('#tomes-message').text('Error on Sign In')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

function signOutFailure () {
  $('#tomes-message').removeClass('hidden')
  $('#tomes-message').text('Sign out failed. Please refresh page.')
}

function changePasswordSuccess () {
  $('form input[type="password"]').val('')
}

function changePasswordFailure () {
  $('#tomes-message').removeClass('hidden')
  $('#tomes-message').text('Changing password failed.')
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
