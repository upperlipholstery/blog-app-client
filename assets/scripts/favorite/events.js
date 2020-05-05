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
  if (!store.user.favTomes.includes(store.favToggleTomeId)) {
    store.user.favTomes.push(store.favToggleTomeId)
  } else {
    store.user.favTomes = store.user.favTomes.filter(fav => fav !== store.favToggleTomeId)
  }
  console.log(store.favToggleTomeId)
  api.toggleFavorite(store.favToggleTomeId)
    .then(ui.toggleFavoriteSuccess)
    .catch(ui.toggleFavoriteFailure)
}

module.exports = {
  onFavoriteTomes,
  onToggleFavorite
}
