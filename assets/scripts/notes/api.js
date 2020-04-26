'use strict'

const store = require('../store')
const config = require('../config')

function createNote (data) {
  return $.ajax({
    url: config.apiUrl + '/notes',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

function showNote (id) {
  return $.ajax({
    url: config.apiUrl + '/notes/' + id,
    method: 'GET'
  })
}

function updateNote (data, id) {
  return $.ajax({
    url: config.apiUrl + '/notes/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

function deleteNote (data, id) {
  return $.ajax({
    url: config.apiUrl + '/notes/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  createNote,
  showNote,
  updateNote,
  deleteNote
}
