'use strict'

const ui = require('../ui')
const api = require('./api')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
const viewPostTemplate = require('../templates/view-body-template.handlebars')

function onViewPosts (event) {
  event.preventDefault()
  api.viewPosts()
    .then(ui.viewPostsSuccess)
    .catch(ui.viewPostsFailure)
}

function onUserViewPosts () {
  event.preventDefault()
  api.viewPosts()
    .then(ui.viewUserPostsSuccess)
    .catch(ui.viewPostsFailure)
}

function selectView (event) {
  event.preventDefault()
  const viewItemId = $(event.target).data('id')
  api.showPost(viewItemId)
    .then(viewPostSuccess)
    .catch(ui.viewPostFailure)
}

function viewPostSuccess (data) {
  console.log(data.post)
  const viewPostHtml = viewPostTemplate({post: data.post})
  $('#view-body').text(viewPostHtml)
}

function cancelUpdate (event) {
  event.preventDefault()
  store.updateItemId = undefined
}

function selectUpdate (event) {
  event.preventDefault()
  store.updateItemId = $(event.target).data('id')
  console.log(store.updateItemId)
  api.showPost(store.updateItemId)
    .then(ui.updatePostsSuccess)
    .catch(ui.updatePostsFailure)
}

function onUpdatePractice (event) {
  event.preventDefault()
  console.log($('#edit-post')[0])
  const updateData = getFormFields($('#edit-post')[0])
  api.updatePost(updateData, store.updateItemId)
    .then(ui.updatePostsSuccess)
    .catch(ui.updatePostsFailure)
}

// const updateCards = function (data) {
//   console.log(data)
//   const updateTableHtml = updateTableTemplate({practice: data.practice})
//   console.log(updateTableHtml)
//   $((`section[data-id=${store.updateItemId}]`)[0]).replaceWith(updateTableHtml)
//   $('#content').append(updateTableHtml)
// }

function onCreatePost (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.createPost(data)
    .then(ui.createPostSuccess)
    .catch(ui.createPostFailure)
}

module.exports = {
  onViewPosts,
  onUserViewPosts,
  selectUpdate,
  cancelUpdate,
  onUpdatePractice,
  selectView,
  onCreatePost
}
