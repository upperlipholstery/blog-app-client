'use strict'

function signUpSuccess () {
  console.log('signUp working')
}

function signUpFailure () {
  console.log('signUp failed')
}

function signInSuccess () {
  console.log('sign in working')
}

function signInFailure () {
  console.log('sign in failed')
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  signInFailure,
  signUpFailure
}
