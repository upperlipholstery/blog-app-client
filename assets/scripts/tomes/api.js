const store = require('../store')
const config = require('../config')

function viewTomes () {
  return $.ajax({
    url: config.apiUrl + '/tomes',
    method: 'GET'
  })
}

function showTome (id) {
  return $.ajax({
    url: config.apiUrl + '/tomes/' + id,
    method: 'GET'
  })
}

function createTome (data) {
  return $.ajax({
    url: config.apiUrl + '/tomes',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

function updateTome (data, id) {
  return $.ajax({
    url: config.apiUrl + '/tomes/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

function deleteTome (id) {
  return $.ajax({
    url: config.apiUrl + '/tomes/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

function getUserTomes (id) {
  return $.ajax({
    url: config.apiUrl + '/users/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  viewTomes,
  showTome,
  createTome,
  updateTome,
  deleteTome,
  getUserTomes
}
