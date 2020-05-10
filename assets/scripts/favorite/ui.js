'use strict'

const showTomesTemplate = require('../templates/blog-tome.handlebars')
const notebarTemplate = require('../templates/notebar-template.handlebars')
const store = require('../store')
const tomeApi = require('../tomes/api')
const tomeUi = require('../tomes/ui')

function viewFavoritesSuccess (data) {
  if (data.favTomes.length === 0) {
    $('#tomes-message').removeClass('hidden')
    $('#tomes-message').text('No Tomes Archived')
  } else {
    $('#tomes-message').addClass('hidden')
  }
  data.favTomes.forEach(tome => tome.favorite = true)
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
    $('.account-page').addClass('hidden')
  }
}

function toggleFavoriteSuccess (data) {
  tomeApi.showTome(store.favToggleTomeId)
    .then(refreshNotebar)
    .catch(tomeUi.viewTomeFailure)
}

function toggleLikeSuccess () {
  tomeApi.showTome(store.likeToggleTomeId)
    .then(refreshNotebar)
    .catch(tomeUi.viewTomeFailure)
}

function refreshNotebar (data) {
  if (data.tome.owner._id === store.user._id) {
    data.tome.notOwn = false
  } else {
    data.tome.notOwn = true
  }
  if (store.user.favTomes.includes(data.tome._id)) {
    data.tome.favorite = true
  }
  if (store.user.likedTomes.includes(data.tome._id)) {
    data.tome.liked = true
  }
  const noteBarHtml = notebarTemplate({tome: data.tome})
  $('.notebar').html(noteBarHtml)
}

function viewFavoritesFailure () {
  $('#tomes-message').removeClass('hidden')
  $('#tomes-message').text('Failed to retrieve favorites.')
}

function toggleFavoriteFailure () {
  $('#tomes-message').removeClass('hidden')
  $('#tomes-message').text('Failed to toggle favorites.')
}

function toggleLikeFailure () {
  $('#tomes-message').removeClass('hidden')
  $('#tomes-message').text('Failed to toggle likes.')
}

module.exports = {
  viewFavoritesSuccess,
  viewFavoritesFailure,
  toggleFavoriteSuccess,
  toggleFavoriteFailure,
  toggleLikeFailure,
  toggleLikeSuccess,
  refreshNotebar
}
