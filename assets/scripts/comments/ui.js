'use strict'

const ui = require('./ui')
// const api = require('./api')
const postApi = require('../posts/api')
const store = require('../store')
// const getFormFields = require('../../../lib/get-form-fields')
const viewbodyTemplate = require('../templates/view-body-template.handlebars')

function createCommentSuccess () {
  postApi.showPost(store.viewItemId)
    .then(refreshCurrentPost)
    .catch(ui.viewPostFailure)
}

function confirmUpdateCommentSuccess () {
  postApi.showPost(store.viewItemId)
    .then(refreshCurrentPost)
    .catch(ui.viewPostFailure)
}

function confirmDeleteCommentSuccess () {
  postApi.showPost(store.viewItemId)
    .then(refreshCurrentPost)
    .catch(ui.viewPostFailure)
}

function cancelUpdateComment () {
  postApi.showPost(store.viewItemId)
    .then(refreshCurrentPost)
    .catch(ui.viewPostFailure)
}

function refreshCurrentPost (data) {
  const a = new Date(data.post[0].createdAt)
  data.post[0].createdAt = a.toDateString()
  data.post[0].createdTime = a.toTimeString()
  if (store.user) {
    data.post[0].comments.forEach(x => {
      if (x.owner === store.user._id) {
        x.own = true
      } else {
        x.own = false
      }
    })
  }
  const viewPostHtml = viewbodyTemplate({post: data.post[0]})
  $('#viewModalLong').html(viewPostHtml)
}

function cancelDeleteComment () {
  $(`.main-comment-buttons`).removeClass('hidden')
  $(`.delete-check[data-id=${store.deleteCommentId}]`).addClass('hidden')
  $(`.delete-comment[data-id=${store.deleteCommentId}]`).removeClass('hidden')
}

module.exports = {
  cancelDeleteComment,
  confirmDeleteCommentSuccess,
  confirmUpdateCommentSuccess,
  createCommentSuccess,
  cancelUpdateComment
}
