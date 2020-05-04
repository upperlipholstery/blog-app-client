'use strict'

const userTemplate = require('../templates/user-template.handlebars')
const otherUserTemplate = require('../templates/other-user-template.handlebars')

function onUploadPicSuccess (data) {
  console.log(data)
}

function onUploadPicFailure (data) {

}

function getOtherUserSuccess (data) {
  console.log(data)
  const otherUserHtml = otherUserTemplate({user: data.user})
  $('#profile-page').html(otherUserHtml)
  $('#tome-content').addClass('hidden')
  $('#create-tome-menu').addClass('hidden')
  $('#tomes-message').addClass('hidden')
  $('.account-page').removeClass('hidden')
}

function getUserSuccess (data) {
  const userHtml = userTemplate({ user: data.user })
  $('#profile-page').html(userHtml)
}

module.exports = {
  onUploadPicSuccess,
  onUploadPicFailure,
  getUserSuccess,
  getOtherUserSuccess
}
