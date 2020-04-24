'use strict'

const store = require('../store')
const config = require('../config')

function createComment (data) {
  return $.ajax({
    url: config.apiUrl + '/comments',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

function showComment (id) {
  return $.ajax({
    url: config.apiUrl + '/comments/' + id,
    method: 'GET'
  })
}

module.exports = {
  createComment,
  showComment
}
