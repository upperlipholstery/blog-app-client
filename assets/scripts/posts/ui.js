'use strict'

const showPostsTemplate = require('../templates/blog-post.handlebars')
const showUserPostsTemplate = require('../templates/owner-blog-posts.handlebars')
const populateUpdateTemplate = require('../templates/populate-update-template.handlebars')
const viewPostTemplate = require('../templates/view-body-template.handlebars')
const viewPostTemplateNoInput = require('../templates/view-body-template-no-input.handlebars')
const api = require('./api')
const store = require('../store')

function viewPostsSuccess (data) {
  data.posts = data.posts.sort(function (a, b) {
    a = new Date(a.createdAt)
    b = new Date(b.createdAt)
    return a > b ? -1 : a < b ? 1 : 0
  })
  data.posts.forEach(x => { x.createdAt = (new Date(x.createdAt).toDateString()) })
  const showPostsHtml = showPostsTemplate({posts: data.posts})
  $('.content').html(showPostsHtml)
  $('#post-content').removeClass('hidden')
  $('#create-post-menu').addClass('hidden')
}

function viewUserPostsSuccess (data) {
  data.posts = data.posts.sort(function (a, b) {
    a = new Date(a.createdAt)
    b = new Date(b.createdAt)
    return a > b ? -1 : a < b ? 1 : 0
  })
  data.posts.forEach(x => { x.createdAt = (new Date(x.createdAt).toDateString()) })
  const showUserPostsHtml = showUserPostsTemplate({posts: data.posts})
  $('.content').html(showUserPostsHtml)
  $('#post-content').removeClass('hidden')
  $('#create-post-menu').addClass('hidden')
}

function viewSinglePostSuccess (data) {
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
  const viewPostHtml = store.user !== undefined ? viewPostTemplate({post: data.post[0]}) : viewPostTemplateNoInput({post: data.post[0]})
  $('#viewModalLong').html(viewPostHtml)
}

function deletePostsSuccess () {
  api.viewPosts()
    .then(refreshListSuccess)
    .catch(refreshListFailure)
}

function selectUpdatePostsSuccess (data) {
  const populateUpdateHtml = populateUpdateTemplate({post: data.post[0]})
  $('#editModalLong').html(populateUpdateHtml)
}

function updatePostsSuccess () {
  api.viewPosts()
    .then(refreshListSuccess)
    .catch(refreshListFailure)
}

function refreshListSuccess (data) {
  data.posts = data.posts.sort(function (a, b) {
    a = new Date(a.createdAt)
    b = new Date(b.createdAt)
    return a > b ? -1 : a < b ? 1 : 0
  })
  data.posts.forEach(x => { x.createdAt = (new Date(x.createdAt).toDateString()) })
  const showUserPostsHtml = showUserPostsTemplate({posts: data.posts})
  $('.content').html(showUserPostsHtml)
}

function createPostSuccess () {
  $('.message').text('Post created')
  $('#create-post')[0].reset('')
}

function deletePostsFailure () {
  console.log('delete Posts failed')
}

function refreshListFailure () {
  console.log('delete Posts failed')
}

function viewPostsFailure () {
  console.log('viewPosts failed')
}

function createPostFailure () {
  $('.messge').text('failed to create post')
}

module.exports = {
  viewPostsSuccess,
  viewUserPostsSuccess,
  viewPostsFailure,
  createPostSuccess,
  createPostFailure,
  deletePostsSuccess,
  deletePostsFailure,
  updatePostsSuccess,
  selectUpdatePostsSuccess,
  viewSinglePostSuccess
}
