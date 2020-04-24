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
  store.viewItemId = $(event.target).data('id')
  api.showPost(store.viewItemId)
    .then(viewSinglePostSuccess)
    .catch(ui.viewPostFailure)
}

function viewSinglePostSuccess (data) {
  const a = new Date(data.post[0].createdAt)
  data.post.createdAt = a.toDateString()
  data.post.createdTime = a.toTimeString()
  if (store.user) {
    data.post[0].comments.forEach(x => {
      if (x.owner === store.user._id) {
        x.own = true
      } else {
        x.own = false
      }
    })
  }
  const viewPostHtml = viewPostTemplate({post: data.post[0]})
  $('#viewModalLong').html(viewPostHtml)
}

function cancelUpdatePost (event) {
  event.preventDefault()
  store.updateItemId = undefined
}

function selectUpdatePost (event) {
  event.preventDefault()
  store.updatePostId = $(event.target).data('id')
  console.log(store.updatePostId)
  api.showPost(store.updatePostId)
    .then(ui.selectUpdatePostsSuccess)
    .catch(ui.updatePostsFailure)
}

function onUpdatePost (event) {
  event.preventDefault()
  console.log($('#edit-post')[0])
  const updateData = getFormFields($('#edit-post')[0])
  api.updatePost(updateData, store.updatePostId)
    .then(ui.updatePostsSuccess)
    .catch(ui.updatePostsFailure)
}

function cancelDeletePost (event) {
  event.preventDefault()
  store.deletePostId = undefined
}

function selectDeletePost (event) {
  event.preventDefault()
  store.deletePostId = $(event.target).data('id')
  api.showPost(store.deletePostId)
    .then(ui.deletePostsSuccess)
    .catch(ui.deletePostsFailure)
}

function onDeletePost (event) {
  event.preventDefault()
  api.deletePost(store.deletePostId)
    .then(ui.deletePostsSuccess)
    .catch(ui.deletePostsFailure)
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
  console.log(data)
  api.createPost(data)
    .then(ui.createPostSuccess)
    .catch(ui.createPostFailure)
}

module.exports = {
  onViewPosts,
  onUserViewPosts,
  selectUpdatePost,
  cancelUpdatePost,
  onUpdatePost,
  selectView,
  onCreatePost,
  onDeletePost,
  selectDeletePost,
  cancelDeletePost
}
