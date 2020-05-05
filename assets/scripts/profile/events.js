'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

function onUploadPic (event) {
  event.preventDefault()
  console.log($('#avatar')[0])
  const formData = new FormData($('#avatar')[0])
  api.createUpload(formData)
    .then(ui.onUploadPicSuccess)
    .catch(ui.onUploadPicFailure)
}

function onUserProfile () {
  api.getUser(store.user._id)
    .then(ui.getUserSuccess)
    .catch(ui.getUserFailure)
}

function onOtherProfile () {
  console.log($(event.target).data('id'))
  store.OtherUserId = $(event.target).data('id')
  api.getUser(store.OtherUserId)
    .then(ui.getOtherUserSuccess)
    .catch(ui.getUserFailure)
}

module.exports = {
  onUploadPic,
  onUserProfile,
  onOtherProfile
}
