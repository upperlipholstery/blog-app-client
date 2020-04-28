'use strict'

const ui = require('./ui')
const api = require('./api')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

function onFavoriteTomes (event) {
  event.preventDefault()
  api.favoriteTomes()
  .then(ui.viewFavoritesSuccess)
  .catch(ui.viewFavoritesFailure)
}

function onToggleFavorite (event) {
  event.preventDefault()
  api.toggleFavorite($(event.target).data('id'))
  .then(ui.toggleFavoriteSuccess)
  .catch(ui.toggleFavoriteFailure)
}

module.exports = {
  onFavoriteTomes,
  onToggleFavorite
}
