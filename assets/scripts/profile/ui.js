'use strict'

const userTemplate = require('../templates/user-template.handlebars')
const defaultUserTemplate = require('../templates/default-user-template.handlebars')
const otherUserTemplate = require('../templates/other-user-template.handlebars')

function onUploadPicSuccess (data) {
  console.log(data)
}

function onUploadPicFailure (data) {

}

function getOtherUserSuccess (data) {
  const otherUserHtml = otherUserTemplate({user: data.user})
  $('#profile-page').html(otherUserHtml)
}

function getUserSuccess (data) {
  const userHtml = data.user.imageUrl ? userTemplate({ user: data.user }) : defaultUserTemplate({ user: data.user })
  $('#profile-page').html(userHtml)
}

module.exports = {
  onUploadPicSuccess,
  onUploadPicFailure,
  getUserSuccess,
  getOtherUserSuccess
}
