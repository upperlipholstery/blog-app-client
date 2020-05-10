'use strict'

const userTemplate = require('../templates/user-template.handlebars')
const otherUserTemplate = require('../templates/other-user-template.handlebars')
const viewTomesTemplate = require('../templates/blog-tome.handlebars')
const avatarTemplate = require('../templates/avatar-template.handlebars')

function onUploadPicSuccess (data) {
}

function onUploadPicFailure (data) {
}

function getOtherUserSuccess (data) {
  data.user.tomes = data.user.tomes.sort(function (a, b) {
    a = new Date(a.createdAt)
    b = new Date(b.createdAt)
    return a > b ? -1 : a < b ? 1 : 0
  })
  data.user.tomes.forEach(x => { x.createdAt = (new Date(x.createdAt).toDateString()) })
  data.user.createdAt = (new Date(data.user.createdAt).toDateString())
  const viewUserTomesHtml = viewTomesTemplate({ tomes: data.user.tomes })
  const otherUserHtml = otherUserTemplate({user: data.user})
  $('#user-tomes').html(viewUserTomesHtml)
  $('#profile-page').html(otherUserHtml)
  $('#tome-content').addClass('hidden')
  $('#create-tome-menu').addClass('hidden')
  $('#tomes-message').addClass('hidden')
  $('.account-page').removeClass('hidden')
}

function getUserSuccess (data) {
  const avatarHtml = avatarTemplate({ user: data.user })
  $('.logo2').html(avatarHtml)
  data.user.createdAt = (new Date(data.user.createdAt).toDateString())
  const userHtml = userTemplate({ user: data.user })
  $('#profile-page').html(userHtml)
  $('#user-tomes').html('')
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
