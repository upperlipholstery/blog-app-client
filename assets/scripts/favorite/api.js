const store = require('../store')
const config = require('../config')

function favoriteTomes () {
  return $.ajax({
    url: config.apiUrl + '/favorites',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

function toggleFavorite (id) {
  return $.ajax({
    url: config.apiUrl + `/favorites/${id}`,
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  favoriteTomes,
  toggleFavorite
}
