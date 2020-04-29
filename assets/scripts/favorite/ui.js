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
    .then(refreshNotebar)
    .catch(tomeUi.viewTomeFailure)
}

function refreshNotebar (data) {
  const a = new Date(data.tome[0].createdAt)
  data.tome[0].createdAt = a.toDateString()
  data.tome[0].createdTime = a.toTimeString()
  if (store.user) {
    if (data.tome[0].owner._id === store.user._id) {
      data.tome[0].notOwn = false
    } else {
      data.tome[0].notOwn = true
    }
    data.tome[0].notes.forEach(x => {
      if (x.owner === store.user._id) {
        x.own = true
      } else {
        x.own = false
      }
    })
    if (store.user.favTomes.includes(data.tome[0]._id)) {
      data.tome[0].favorite = true
    }
  }
  const notebarHtml = notebarTemplate({tome: data.tome[0]})
  $('.notebar').html(notebarHtml)
  tomeApi.viewTomes()
    .then(tomeUi.viewTomesSuccess)
    .catch(tomeUi.viewTomesFailure)
}

module.exports = {
  viewFavoritesSuccess,
  viewFavoritesFailure,
  toggleFavoriteSuccess,
  toggleFavoriteFailure
}
