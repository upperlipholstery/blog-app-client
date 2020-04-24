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
  const updateCommentHtml = updateCommentTemplate({post: data.post})
  console.log(updateCommentHtml)
  $(`.comment-body[data-id=${store.updateCommentId}]`)[0].html(updateCommentHtml)
  // const updateData = getFormFields($('#edit-post')[0])
  // api.updateComment(updateData, store.updateCommentId)
  //   .then(ui.updateCommentsSuccess)
  //   .catch(ui.updateCommentsFailure)
}

function cancelUpdateComment (event) {
  event.preventDefault()
  store.updateItemId = undefined
}

function confirmUpdateComment (event) {
  event.preventDefault()
  store.updateCommentId = $(event.target).data('id')
  console.log(store.updateCommentId)
  api.showComment(store.updateCommentId)
    .then(ui.selectUpdateCommentsSuccess)
    .catch(ui.updateCommentsFailure)
}


module.exports = {
  onCreateComment,
  onUpdateComment
}
