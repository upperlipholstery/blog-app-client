'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

const tomeEvents = require('./tomes/events')
const noteEvents = require('./notes/events')
const authEvents = require('./auth/events')
const favoriteEvents = require('./favorite/events')
const noteUi = require('./notes/ui')
const ui = require('./ui')
const profileEvents = require('./profile/events')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // AUTH EVENTS
  $('#sign-up-btn').on('click', authEvents.onSignUp)
  $('#sign-in-btn').on('click', authEvents.onSignIn)
  $('.change-password-button').on('click', authEvents.onChangePassword)
  $('.right-body').on('click', '#sign-out-btn', authEvents.onSignOut)

  // UI events
  $('#account-menu').on('click', ui.showAccount)

  // View events
  $('#view-tomes-btn').on('click', tomeEvents.onViewTomes)
  $('#view-tomes-btn-2').on('click', tomeEvents.onViewTomes)
  $('#view-user-tomes-btn').on('click', tomeEvents.onUserViewTomes)
  $('.content').on('click', '.view-modal', tomeEvents.selectView)

  // Create tome action
  $('#create-tome').on('submit', tomeEvents.onCreateTome)
  $('#create-tome-btn').on('click', ui.showWriteTome)

  // Update tome actions
  $('#editModalLong').on('click', '.update-button', tomeEvents.onUpdateTome)
  $('.cancel-update').on('click', tomeEvents.cancelUpdateTome)
  $('.content').on('click', '.update-modal', tomeEvents.selectUpdateTome)

  // Delete tome actions
  $('.delete-tome-button').on('click', tomeEvents.onDeleteTome)
  $('.cancel-delete').on('click', tomeEvents.cancelDeleteTome)
  $('.content').on('click', '.delete-modal', tomeEvents.selectDeleteTome)

  // Favorite tome
  $('#viewModalLong').on('click', '.toggle-favorite', favoriteEvents.onToggleFavorite)
  $('#view-favorite-tomes-btn').on('click', favoriteEvents.onFavoriteTomes)

  // Create note actions
  $('#viewModalLong').on('submit', '#create-note', noteEvents.onCreateNote)

  // Update note actions
  $('#viewModalLong').on('click', '.edit-note', noteEvents.onUpdateNote)
  $('#viewModalLong').on('click', '.confirm-note-edit', noteEvents.confirmUpdateNote)
  $('#viewModalLong').on('click', '.cancel-note-edit', noteUi.cancelUpdateNote)

  // Delete note actions
  $('#viewModalLong').on('click', '.delete-note', noteEvents.onDeleteNote)
  $('#viewModalLong').on('click', '.confirm-note-delete', noteEvents.confirmDeleteNote)
  $('#viewModalLong').on('click', '.cancel-note-delete', noteUi.cancelDeleteNote)

  // profile EVENTS
  $('.right-body').on('click', '#submit-avatar', profileEvents.onUploadPic)
  $('.content').on('click', '.user-link', profileEvents.onOtherProfile)
  $('.right-body').on('click', '#bio-submit', profileEvents.onChangeBio)

  // Enter key confirms sign in/up
  $('#SUEnter').keypress(function (event) {
    console.log(event.keyCode)
    if (event.keyCode === 13) {
      $('.sign-up-button').click()
    }
  })
  $('#SIEnter').keypress(function (event) {
    if (event.keyCode === 13) {
      $('.sign-in-button').click()
    }
  })
  $('#CPnter').keypress(function (event) {
    if (event.keyCode === 13) {
      $('.change-password-button').click()
    }
  })
})
