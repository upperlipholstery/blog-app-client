const store = require('../store')
const config = require('../config')

function viewPosts () {
  return $.ajax({
    url: config.apiUrl + '/posts',
    method: 'GET'
  })
}

module.exports = {
  viewPosts
}
