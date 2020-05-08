'use strict'

const ui = require('./ui')
const tomeApi = require('../tomes/api')
const tomeUi = require('../tomes/ui')
const store = require('../store')
const viewbodyTemplate = require('../templates/view-body-template.handlebars')
const tomeNotesTemplate = require('../templates/tome-notes-template.handlebars')
const favUi = require('../favorite/ui')

function createNoteSuccess () {
  $('.form-input[type="text"]').val('')
  $('#note-message').text('Note created!')
  tomeApi.showTome(store.viewItemId)
    .then(refreshTomeNotes)
    .then(favUi.refreshNotebar)
    .catch(ui.viewTomeFailure)
}

function confirmUpdateNoteSuccess () {
  tomeApi.showTome(store.viewItemId)
    .then(refreshTomeNotes)
    .catch(ui.viewTomeFailure)
}

function confirmDeleteNoteSuccess () {
  tomeApi.showTome(store.viewItemId)
    .then(refreshTomeNotes)
    .then(favUi.refreshNotebar)
    .catch(ui.viewTomeFailure)
}

function cancelUpdateNote () {
  $(`.main-note-buttons[data-id=${store.updateNoteId}]`).removeClass('hidden')
  $('.edit-note').attr('disabled', false)
  $('.delete-note').attr('disabled', false)
  tomeApi.showTome(store.viewItemId)
    .then(refreshTomeNotes)
    .catch(ui.viewTomeFailure)
}

function refreshTomeNotes (data) {
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
  }
  const tomeNotesHtml = tomeNotesTemplate({notes: data.tome.notes})
  $('#collapseExample').html(tomeNotesHtml)
  return data
}

function refreshCurrentTome (data) {
  const a = new Date(data.tome[0].createdAt)
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
      data.tome[0].favorite = true
    }
  }
  const viewTomeHtml = viewbodyTemplate({tome: data.tome})
  $('#viewModalLong').html(viewTomeHtml)
  tomeApi.viewTomes()
    .then(tomeUi.viewTomesSuccess)
    .catch(tomeUi.viewTomesFailure)
}

function cancelDeleteNote () {
  $(`.main-note-buttons[data-id=${store.deleteNoteId}]`).removeClass('hidden')
  $('.edit-note').attr('disabled', false)
  $('.delete-note').attr('disabled', false)
  $(`.delete-check[data-id=${store.deleteNoteId}]`).addClass('hidden')
}

function createNoteFailure () {
  $('#note-message').text('Please fill out the text box')
}

module.exports = {
  cancelDeleteNote,
  confirmDeleteNoteSuccess,
  confirmUpdateNoteSuccess,
  createNoteSuccess,
  cancelUpdateNote,
  refreshCurrentTome,
  createNoteFailure
}
