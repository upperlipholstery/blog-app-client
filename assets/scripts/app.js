'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

const tomeEvents = require('./tomes/events')
const noteEvents = require('./notes/events')
const authEvents = require('./auth/events')
const noteUi = require('./notes/ui')
const ui = require('./ui')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // AUTH EVENTS
  $('#sign-up-btn').on('click', authEvents.onSignUp)
  $('#sign-in-btn').on('click', authEvents.onSignIn)
  $('.change-password-button').on('click', authEvents.onChangePassword)
  $('#sign-out-btn').on('click', authEvents.onSignOut)

  // VIEW EVENTS

  $('#view-tomes-btn').on('click', tomeEvents.onViewTomes)
  $('#view-tomes-btn-2').on('click', tomeEvents.onViewTomes)
  $('#view-user-tomes-btn').on('click', tomeEvents.onUserViewTomes)
  $('.content').on('click', '.view-modal', tomeEvents.selectView)
  $('#view-favorite-tomes-btn').on('click', tomeEvents.onFavoriteTomes)

  // Update tome actions
  $('#editModalLong').on('click', '.update-button', tomeEvents.onUpdateTome)
  $('.cancel-update').on('click', tomeEvents.cancelUpdateTome)
  $('.content').on('click', '.update-modal', tomeEvents.selectUpdateTome)

  // Delete tome actions
  $('.delete-tome-button').on('click', tomeEvents.onDeleteTome)
  $('.cancel-delete').on('click', tomeEvents.cancelDeleteTome)
  $('.content').on('click', '.delete-modal', tomeEvents.selectDeleteTome)

  // create tome action
  $('#create-tome').on('submit', tomeEvents.onCreateTome)
  $('#create-tome-btn').on('click', ui.showWriteTome)

  // Create note
  $('#viewModalLong').on('submit', '#create-note', noteEvents.onCreateNote)

  // Update note actions
  $('#viewModalLong').on('click', '.edit-note', noteEvents.onUpdateNote)
  $('#viewModalLong').on('click', '.confirm-note-edit', noteEvents.confirmUpdateNote)
  $('#viewModalLong').on('click', '.cancel-note-edit', noteUi.cancelUpdateNote)

  // Delete note actions
  $('#viewModalLong').on('click', '.delete-note', noteEvents.onDeleteNote)
  $('#viewModalLong').on('click', '.confirm-note-delete', noteEvents.confirmDeleteNote)
  $('#viewModalLong').on('click', '.cancel-note-delete', noteUi.cancelDeleteNote)

})
