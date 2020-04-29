'use strict'

const showTomesTemplate = require('../templates/blog-tome.handlebars')
const store = require('../store')
const noteUi = require('../notes/ui')
const tomeApi = require('../tomes/api')
const tomeUi = require('../tomes/ui')

function viewFavoritesSuccess (data) {
  console.log(data)
  if (data.favTomes) {
    data.favTomes = data.favTomes.sort(function (a, b) {
      a = new Date(a.createdAt)
      b = new Date(b.createdAt)
      return a > b ? -1 : a < b ? 1 : 0
    })
    data.favTomes.forEach(x => { x.createdAt = (new Date(x.createdAt).toDateString()) })
    const showTomesHtml = showTomesTemplate({tomes: data.favTomes})
    $('.content').html(showTomesHtml)
    $('#tome-content').removeClass('hidden')
    $('#create-tome-menu').addClass('hidden')
  } else {
    console.log('no favorites')
  }
}

function viewFavoritesFailure () {
  console.log('viewFavorites failed')
}

function toggleFavoriteFailure () {
  console.log('toggleFavorites failed')
}

function toggleFavoriteSuccess (data) {
  store.user.favTomes = data.favorites
  tomeApi.showTome(store.favToggleTomeId)
    .then(noteUi.refreshCurrentTome)
    .catch(tomeUi.viewTomeFailure)
}

module.exports = {
  viewFavoritesSuccess,
  viewFavoritesFailure,
  toggleFavoriteSuccess,
  toggleFavoriteFailure
}
