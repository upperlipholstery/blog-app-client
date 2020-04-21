'use strict'

const config = require('../config')

function signUp (data) {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data
  })
}

module.exports = {
  signUp
}
