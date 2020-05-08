'use strict'

const userTemplate = require('../templates/user-template.handlebars')
const otherUserTemplate = require('../templates/other-user-template.handlebars')
const resetProfile = require('../ui.js')

function onUploadPicSuccess (data) {

}

function onUploadPicFailure (data) {

}

function getOtherUserSuccess (data) {
  data.user.createdAt = (new Date(data.user.createdAt).toDateString())
  const otherUserHtml = otherUserTemplate({user: data.user})
  $('#profile-page').html(otherUserHtml)
  $('#tome-content').addClass('hidden')
  $('#create-tome-menu').addClass('hidden')
  $('#tomes-message').addClass('hidden')
  $('.account-page').removeClass('hidden')
}

function getUserSuccess (data) {
  data.user.createdAt = (new Date(data.user.createdAt).toDateString())
  const userHtml = userTemplate({ user: data.user })
  $('#profile-page').html(userHtml)
  $('#tome-content').addClass('hidden')
  $('#create-tome-menu').addClass('hidden')
  $('#tomes-message').addClass('hidden')
  $('.account-page').removeClass('hidden')
}

function onUpdateBioSuccess () {
  $('#bio-edit').click()
}

function onUpdateBioFailure () {
}

module.exports = {
  onUploadPicSuccess,
  onUploadPicFailure,
  getUserSuccess,
  getOtherUserSuccess,
  onUpdateBioSuccess,
  onUpdateBioFailure
}
