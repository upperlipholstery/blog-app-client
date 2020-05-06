'use strict'

const api = require('./api')
const ui = require('./ui')
const store = require('../store')

function onUploadPic (event) {
  event.preventDefault()
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

function onChangeBio (event) {
  event.preventDefault()
  const newBio = { bio: $('#bio-edit').val() }
  api.updateBio(newBio)
    .then(ui.onUpdateBioSuccess)
    .catch(ui.onUpdateBioFailure)
  console.log(newBio)
}

function onOtherProfile () {
  if ($(event.target).data('id') === store.user._id) {
    onUserProfile()
  } else {
    store.OtherUserId = $(event.target).data('id')
    api.getUser(store.OtherUserId)
      .then(ui.getOtherUserSuccess)
      .catch(ui.getUserFailure)
  }
}

module.exports = {
  onUploadPic,
  onUserProfile,
  onOtherProfile,
  onChangeBio
}
