'use strict'

const ui = require('./ui')
const api = require('./api')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
const updateNoteTemplate = require('../templates/update-note-template.handlebars')

function onCreateNote (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  data.note.tomeId = store.viewItemId
  api.createNote(data)
    .then(ui.createNoteSuccess)
    .catch(ui.createNoteFailure)
}

function onUpdateNote (event) {
  event.preventDefault()
  store.updateNoteId = $(event.target).data('id')
  $('.main-note-buttons').addClass('hidden')
  api.showNote(store.updateNoteId)
    .then(populateNote)
    .catch(ui.updateNotesFailure)
}

function populateNote (data) {
  const updateNoteHtml = updateNoteTemplate({note: data.note[0]})
  $($(`.note-body[data-id=${store.updateNoteId}]`)[0]).html(updateNoteHtml)
}

function confirmUpdateNote (event) {
  event.preventDefault()
  const data = getFormFields($(`.edit-note-form[data-id=${store.updateNoteId}]`)[0])
  data.note.tomeId = store.viewItemId

  api.updateNote(data, store.updateNoteId)
    .then(ui.confirmUpdateNoteSuccess)
    .catch(ui.updateNotesFailure)
}

function onDeleteNote (event) {
  event.preventDefault()
  store.deleteNoteId = $(event.target).data('id')
  $('.main-note-buttons').addClass('hidden')
  $(`.delete-check[data-id=${store.deleteNoteId}]`).removeClass('hidden')
  $(`.delete-note[data-id=${store.deleteNoteId}]`).addClass('hidden')
}

function confirmDeleteNote (event) {
  const data = { note: {
    tomeId: store.viewItemId }
  }
  $('.main-note-buttons').removeClass('hidden')
  api.deleteNote(data, store.deleteNoteId)
    .then(ui.confirmDeleteNoteSuccess)
    .catch(ui.deleteNotesFailure)
}

module.exports = {
  onCreateNote,
  onUpdateNote,
  confirmUpdateNote,
  confirmDeleteNote,
  onDeleteNote
}
