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

function updateComment (data, id) {
  return $.ajax({
    url: config.apiUrl + '/comments/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

function deleteComment (data, id) {
  return $.ajax({
    url: config.apiUrl + '/comments/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  createComment,
  showComment,
  updateComment,
  deleteComment
}
