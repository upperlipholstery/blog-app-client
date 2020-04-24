'use strict'

const ui = require('../ui')
const api = require('./api')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
const updateCommentTemplate = require('../templates/update-comment-template.handlebars')

function onCreateComment (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  data.comment.postId = store.viewItemId
  api.createComment(data)
    .then(data => console.log(data))
    .catch(ui.createCommentFailure)
}

function onUpdateComment (event) {
  event.preventDefault()
  store.updateCommentId = $(event.target).data('id')
  api.showComment(store.updateCommentId)
    .then(populateComment)
    .catch(ui.updateCommentsFailure)
}

function populateComment (data) {
  const updateCommentHtml = updateCommentTemplate({comment: data.comment[0]})
  $($(`.comment-body[data-id=${store.updateCommentId}]`)[0]).html(updateCommentHtml)
}

function confirmUpdateComment (event) {
  event.preventDefault()
  console.log(store.updateCommentId)
  console.log($(`.edit-comment-form[data-id=${store.updateCommentId}]`)[0])
  const data = getFormFields($(`.edit-comment-form[data-id=${store.updateCommentId}]`)[0])
  data.comment.postId = store.viewItemId
  api.updateComment(data, store.updateCommentId)
    .then(ui.confirmUpdateCommentSuccess)
    .catch(ui.updateCommentsFailure)
}

function cancelUpdateComment (event) {
  event.preventDefault()
  store.updateItemId = null
}

module.exports = {
  onCreateComment,
  onUpdateComment,
  confirmUpdateComment
}
