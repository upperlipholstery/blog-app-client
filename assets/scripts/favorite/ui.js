'use strict'

const showTomesTemplate = require('../templates/blog-tome.handlebars')
const showUserTomesTemplate = require('../templates/owner-blog-tomes.handlebars')
const populateUpdateTemplate = require('../templates/populate-update-template.handlebars')
const viewTomeTemplate = require('../templates/view-body-template.handlebars')
const viewTomeTemplateNoInput = require('../templates/view-body-template-no-input.handlebars')
const api = require('./api')
const store = require('../store')

function viewFavoritesSuccess (data) {
  console.log(data)
  if(data.favTomes){
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
  }
  else{
    console.log('no favorites')
  }
}

function viewFavoritesFailure () {
  console.log('viewFavorites failed')
}

function toggleFavoriteFailure () {
  console.log('toggleFavorites failed')
}

module.exports = {
  viewFavoritesSuccess,
  viewFavoritesFailure,
  //toggleFavoriteSuccess,
  toggleFavoriteFailure
}
