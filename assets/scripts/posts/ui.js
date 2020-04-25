'use strict'

const showPostsTemplate = require('../templates/blog-post.handlebars')
const showUserPostsTemplate = require('../templates/owner-blog-posts.handlebars')
const populateUpdateTemplate = require('../templates/populate-update-template.handlebars')
const api = require('./api')

function viewPostsSuccess (data) {
  console.log('viewPostsSuccess')
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

function deletePostsSuccess () {
  console.log('delete Posts success')
  api.viewPosts()
    .then(refreshListSuccess)
    .catch(refreshListFailure)
}

function selectUpdatePostsSuccess (data) {
  console.log('selectUpdatePostsSuccess')
  const populateUpdateHtml = populateUpdateTemplate({post: data.post[0]})
  $('#editModalLong').html(populateUpdateHtml)
}

function updatePostsSuccess () {
  api.viewPosts()
    .then(refreshListSuccess)
    .catch(refreshListFailure)
}

function refreshListSuccess (data) {
  const showUserPostsHtml = showUserPostsTemplate({posts: data.posts})
  $('.content').html(showUserPostsHtml)
}

function createPostSuccess () {
  console.log('create post success')
  $('.message').text('Post created')
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
  selectUpdatePostsSuccess
}
