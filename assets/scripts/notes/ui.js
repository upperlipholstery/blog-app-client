'use strict'

const ui = require('./ui')
// const api = require('./api')
const tomeApi = require('../tomes/api')
const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')
const viewbodyTemplate = require('../templates/view-body-template.handlebars')

function createNoteSuccess () {
  tomeApi.showTome(store.viewItemId)
    .then(refreshCurrentTome)
    .catch(ui.viewTomeFailure)
}

function confirmUpdateNoteSuccess () {
  tomeApi.showTome(store.viewItemId)
    .then(refreshCurrentTome)
    .catch(ui.viewTomeFailure)
}

function confirmDeleteNoteSuccess () {
  tomeApi.showTome(store.viewItemId)
    .then(refreshCurrentTome)
    .catch(ui.viewTomeFailure)
}

function cancelUpdateNote () {
  tomeApi.showTome(store.viewItemId)
    .then(refreshCurrentTome)
    .catch(ui.viewTomeFailure)
}

function refreshCurrentTome (data) {
  const a = new Date(data.tome[0].createdAt)
  data.tome[0].createdAt = a.toDateString()
  data.tome[0].createdTime = a.toTimeString()
  if (store.user) {
    data.tome[0].notes.forEach(x => {
      if (x.owner === store.user._id) {
        x.own = true
      } else {
        x.own = false
      }
    })
  }
  const viewTomeHtml = viewbodyTemplate({tome: data.tome[0]})
  $('#viewModalLong').html(viewTomeHtml)
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
  cancelUpdateNote
}
