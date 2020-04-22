'use strict'

const store = require('./store'),
showPostsTemplate = require('./templates/')


function signUpSuccess (data) {
  store.user = data.user
  console.log('signUp working')
}

function signInSuccess (data) {
  store.user = data.user
  console.log('sign in working')
}

function signUpFailure () {
  console.log('signUp failed')
}

function signInFailure () {
  console.log('sign in failed')
}

function signOutSuccess () {
  console.log('sign out is working')
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
