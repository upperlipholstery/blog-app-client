'use strict'

const showTomesTemplate = require('../templates/blog-tome.handlebars')
const showUserTomesTemplate = require('../templates/owner-blog-tomes.handlebars')
const populateUpdateTemplate = require('../templates/populate-update-template.handlebars')
const viewTomeTemplate = require('../templates/view-body-template.handlebars')
const viewTomeTemplateNoInput = require('../templates/view-body-template-no-input.handlebars')
const api = require('./api')
const store = require('../store')

function viewTomesSuccess (data) {
  if (data.tomes.length === 0) {
    $('#tomes-message').removeClass('hidden')
    $('#tomes-message').text('No Tomes Written')
  } else {
    $('#tomes-message').addClass('hidden')
  }
  data.tomes = data.tomes.sort(function (a, b) {
    a = new Date(a.createdAt)
    b = new Date(b.createdAt)
    return a > b ? -1 : a < b ? 1 : 0
  })
  data.tomes.forEach(x => {
    x.createdAt = (new Date(x.createdAt).toDateString())
    if (store.user) {
      if (store.user.favTomes.includes(x._id)) {
        x.favorite = true
      }
    }
  })
  const showTomesHtml = showTomesTemplate({tomes: data.tomes})
  $('.content').html(showTomesHtml)
  $('#tome-content').removeClass('hidden')
  $('#create-tome-menu').addClass('hidden')
  $('.account-page').addClass('hidden')
}

function viewUserTomesSuccess (data) {
  if (data.user.tomes.length === 0) {
    $('#tomes-message').removeClass('hidden')
    $('#tomes-message').text('No Tomes Written')
  } else {
    $('#tomes-message').addClass('hidden')
  }
  data.user.tomes = data.user.tomes.sort(function (a, b) {
    a = new Date(a.createdAt)
    b = new Date(b.createdAt)
    return a > b ? -1 : a < b ? 1 : 0
  })
  data.user.tomes.forEach(x => { x.createdAt = (new Date(x.createdAt).toDateString()) })
  const showUserTomesHtml = showUserTomesTemplate({tomes: data.user.tomes})
  $('.content').html(showUserTomesHtml)
  $('#tome-content').removeClass('hidden')
  $('#create-tome-menu').addClass('hidden')
  $('.account-page').addClass('hidden')
}

function viewSingleTomeSuccess (data) {
  const a = new Date(data.tome.createdAt)
  data.tome.createdAt = a.toDateString()
  data.tome.createdTime = a.toTimeString()
  if (store.user) {
    if (data.tome.owner._id === store.user._id) {
      data.tome.notOwn = false
    } else {
      data.tome.notOwn = true
    }
    data.tome.notes.forEach(x => {
      if (x.owner === store.user._id) {
        x.own = true
      } else {
        x.own = false
      }
    })
    if (store.user.favTomes.includes(data.tome._id)) {
      data.tome.favorite = true
    }
    if (store.user.likedTomes.includes(data.tome._id)) {
      data.tome.liked = true
    }
  }
  const viewTomeHtml = store.user !== undefined ? viewTomeTemplate({tome: data.tome}) : viewTomeTemplateNoInput({tome: data.tome})
  $('#viewModalLong').html(viewTomeHtml)
}

function deleteTomesSuccess () {
  api.getUserTomes(store.user._id)
    .then(viewUserTomesSuccess)
    .catch(refreshListFailure)
}

function selectUpdateTomesSuccess (data) {
  const populateUpdateHtml = populateUpdateTemplate({tome: data.tome})
  $('#editModalLong').html(populateUpdateHtml)
}

function updateTomesSuccess () {
  api.getUserTomes(store.user._id)
    .then(viewUserTomesSuccess)
    .catch(refreshListFailure)
}

function createTomeSuccess () {
  $('.input-message').text('Tome created!')
  $('#create-tome')[0].reset('')
}

function deleteTomesFailure () {
  $('#tomes-message').removeClass('hidden')
  $('#tomes-message').text('Failed to delete tome.')
}

function refreshListFailure () {
  $('#tomes-message').removeClass('hidden')
  $('#tomes-message').text('Failed to retrieve tomes.')
}

function viewTomesFailure () {

}

function createTomeFailure () {

}

module.exports = {
  viewTomesSuccess,
  viewUserTomesSuccess,
  viewTomesFailure,
  createTomeSuccess,
  createTomeFailure,
  deleteTomesSuccess,
  deleteTomesFailure,
  updateTomesSuccess,
  selectUpdateTomesSuccess,
  viewSingleTomeSuccess
}
