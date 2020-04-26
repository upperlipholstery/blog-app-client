'use strict'

const ui = require('./ui')
const api = require('./api')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

function onViewTomes (event) {
  event.preventDefault()
  api.viewTomes()
    .then(ui.viewTomesSuccess)
    .catch(ui.viewTomesFailure)
}

function onUserViewTomes () {
  event.preventDefault()
  api.getUserTomes(store.user._id)
    .then(ui.viewUserTomesSuccess)
    .catch(ui.viewTomesFailure)
}

function selectView (event) {
  event.preventDefault()
  store.viewItemId = $(event.target).data('id')
  api.showTome(store.viewItemId)
    .then(ui.viewSingleTomeSuccess)
    .catch(ui.viewTomeFailure)
}

function cancelUpdateTome (event) {
  event.preventDefault()
  store.updateItemId = undefined
}

function selectUpdateTome (event) {
  event.preventDefault()
  store.updateTomeId = $(event.target).data('id')
  api.showTome(store.updateTomeId)
    .then(ui.selectUpdateTomesSuccess)
    .catch(ui.updateTomesFailure)
}

function onUpdateTome (event) {
  event.preventDefault()
  const updateData = getFormFields($('#edit-Tome')[0])
  api.updateTome(updateData, store.updateTomeId)
    .then(ui.updateTomesSuccess)
    .catch(ui.updateTomesFailure)
}

function cancelDeleteTome (event) {
  event.preventDefault()
  store.deleteTomeId = undefined
}

function selectDeleteTome (event) {
  event.preventDefault()
  store.deleteTomeId = $(event.target).data('id')
}

function onDeleteTome (event) {
  event.preventDefault()
  api.deleteTome(store.deleteTomeId)
    .then(ui.deleteTomesSuccess)
    .catch(ui.deleteTomesFailure)
}

function onCreateTome (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createTome(data)
    .then(ui.createTomeSuccess)
    .catch(ui.createTomeFailure)
}

module.exports = {
  onViewTomes,
  onUserViewTomes,
  selectUpdateTome,
  cancelUpdateTome,
  onUpdateTome,
  selectView,
  onCreateTome,
  onDeleteTome,
  selectDeleteTome,
  cancelDeleteTome
}
