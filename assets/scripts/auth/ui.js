'use strict'

const store = require('../store')
const api = require('./api')
const avatarTemplate = require('../templates/avatar-template.handlebars')
const defaultAvatarTemplate = require('../templates/default-avatar-template.handlebars')

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
  console.log('signUp working')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
}

function signInSuccess (data) {
  store.user = data.user
  console.log(store.user)
  $('#regsidebar').removeClass('hidden')
  $('#unregsidebar').addClass('hidden')
  $('#tomes-message').addClass('hidden')
  $('#content').html('')
  $('form input[type="text"]').val('')
  $('form input[type="password"]').val('')
  const avatarHtml = data.user.imageUrl ? avatarTemplate({ user: data.user }) : defaultAvatarTemplate({ user: data.user })
  $('.logo2').html(avatarHtml)
}

function signOutSuccess () {
  console.log('sign out is working')
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
  console.log(data.status === 409)
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
