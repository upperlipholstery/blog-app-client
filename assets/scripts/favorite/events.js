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
    store.user.favTomes = store.user.favTomes.filter(fav => {
      return fav !== store.favToggleTomeId
    })
  }
  api.toggleFavorite(store.favToggleTomeId)
    .then(ui.toggleFavoriteSuccess)
    .catch(ui.toggleFavoriteFailure)
}

function onToggleLike () {
  event.preventDefault()
  store.likeToggleTomeId = $(event.target).data('id')
  if (!store.user.likedTomes.includes(store.likeToggleTomeId)) {
    store.user.likedTomes.push(store.likeToggleTomeId)
  } else {
    store.user.likedTomes = store.user.likedTomes.filter(like => like !== store.likeToggleTomeId)
  }
  api.toggleFavorite(store.likeToggleTomeId)
    .then(ui.toggleLikeSuccess)
    .catch(ui.toggleLikeFailure)
}

module.exports = {
  onFavoriteTomes,
  onToggleFavorite,
  onToggleLike
}
