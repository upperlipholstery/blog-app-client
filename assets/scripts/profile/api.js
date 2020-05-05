'use strict'

const store = require('../store')
const config = require('../config')

const createUpload = formData => {
  return $.ajax({
    url: config.apiUrl + '/uploads/',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: formData,
    contentType: false,
    processData: false
  })
}

function updateBio (data) {
  return $.ajax({
    url: config.apiUrl + '/user_bio/',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

function getUser (id) {
  return $.ajax({
    url: config.apiUrl + '/users/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createUpload,
  getUser,
  updateBio
}
