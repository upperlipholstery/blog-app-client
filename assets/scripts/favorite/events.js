'use strict'

const ui = require('./ui')
const api = require('./api')
const store = require('../store')

function onFavoriteTomes (event) {
  event.preventDefault()
  api.favoriteTomes()
    .then(ui.viewFavoritesSuccess)
    .catch(ui.viewFavoritesFailure)
}

function onToggleFavorite (event) {
  event.preventDefault()
  store.favToggleTomeId = $(event.target).data('id')
  api.toggleFavorite(store.favToggleTomeId)
    .then(ui.toggleFavoriteSuccess)
    .catch(ui.toggleFavoriteFailure)
}

module.exports = {
  onFavoriteTomes,
  onToggleFavorite
}
