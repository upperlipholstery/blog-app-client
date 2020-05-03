'use strict'

const ui = require('./ui')
const tomeApi = require('../tomes/api')
const tomeUi = require('../tomes/ui')
const store = require('../store')
const viewbodyTemplate = require('../templates/view-body-template.handlebars')
const tomeNotesTemplate = require('../templates/tome-notes-template.handlebars')

function createNoteSuccess () {

  tomeApi.showTome(store.viewItemId)
    .then(refreshTomeNotes)
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
    .catch(ui.viewTomeFailure)
}

function cancelUpdateNote () {
  tomeApi.showTome(store.viewItemId)
    .then(refreshTomeNotes)
    .catch(ui.viewTomeFailure)
}

function refreshTomeNotes (data) {
  if (store.user) {
    if (data.tome[0].owner._id === store.user._id) {
      data.tome[0].notOwn = false
    } else {
      data.tome[0].notOwn = true
    }
    data.tome[0].notes.forEach(x => {
      if (x.owner === store.user._id) {
        x.own = true
      } else {
        x.own = false
      }
    })
    if (store.user.favTomes.includes(data.tome[0]._id)) {
      data.tome[0].favorite = true
    }
  }
  const tomeNotesHtml = tomeNotesTemplate({notes: data.tome[0].notes})
  $('#collapseExample').html(tomeNotesHtml)
}

function refreshCurrentTome (data) {
  const a = new Date(data.tome[0].createdAt)
  data.tome[0].createdAt = a.toDateString()
  data.tome[0].createdTime = a.toTimeString()
  if (store.user) {
    if (data.tome[0].owner._id === store.user._id) {
      data.tome[0].notOwn = false
    } else {
      data.tome[0].notOwn = true
    }
    data.tome[0].notes.forEach(x => {
      if (x.owner === store.user._id) {
        x.own = true
      } else {
        x.own = false
      }
    })
    if (store.user.favTomes.includes(data.tome[0]._id)) {
      data.tome[0].favorite = true
    }
  }
  const viewTomeHtml = viewbodyTemplate({tome: data.tome[0]})
  $('#viewModalLong').html(viewTomeHtml)
  tomeApi.viewTomes()
    .then(tomeUi.viewTomesSuccess)
    .catch(tomeUi.viewTomesFailure)
}

function cancelDeleteNote () {
  $(`.main-note-buttons`).removeClass('hidden')
  $(`.delete-check[data-id=${store.deleteNoteId}]`).addClass('hidden')
  $(`.delete-note[data-id=${store.deleteNoteId}]`).removeClass('hidden')
}

module.exports = {
  cancelDeleteNote,
  confirmDeleteNoteSuccess,
  confirmUpdateNoteSuccess,
  createNoteSuccess,
  cancelUpdateNote,
  refreshCurrentTome
}
