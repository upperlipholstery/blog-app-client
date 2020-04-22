const store = require('../store')
const config = require('../config')

function viewPosts () {
  return $.ajax({
    url: config.apiUrl + '/posts',
    method: 'GET'
  })
}

function showPost (id) {
  return $.ajax({
    url: config.apiUrl + '/posts/' + id,
    method: 'GET'
  })
}

function updatePost (data, id) {
  return $.ajax({
    url: config.apiUrl + '/posts/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  viewPosts,
  showPost,
  updatePost
}
