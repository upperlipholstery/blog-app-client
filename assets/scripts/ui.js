'use strict'

const store = require('./store')
const showPostsTemplate = require('./templates/blog-post.handlebars')
const showUserPostsTemplate = require('./templates/owner-blog-posts.handlebars')
const postApi = require('./posts/api')

// POSTS CRUD

function viewPostsSuccess (data) {
  console.log('viewpost')
  const showPostsHtml = showPostsTemplate({posts: data.posts})
  $('.content').html(showPostsHtml)
  $('#content').removeClass('hidden')
  $('#create-post-menu').addClass('hidden')
}

function viewUserPostsSuccess (data) {
  const showUserPostsHtml = showUserPostsTemplate({posts: data.posts})
  $('.content').html(showUserPostsHtml)
  $('#content').removeClass('hidden')
  $('#create-post-menu').addClass('hidden')
}

function deletePostsSuccess () {
  console.log('delete Posts success')
  postApi.viewPosts()
    .then(refreshListSuccess)
    .catch(refreshListFailure)
}

function updatePostsSuccess () {
  console.log('delete Posts success')
  postApi.viewPosts()
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

// AUTHENTICATION

function signUpSuccess (data) {
  store.user = data.user
  console.log('signUp working')
}

function signInSuccess (data) {
  store.user = data.user
  // api.viewPosts()
  //   .then(viewPostsSuccess)
  //   .catch(viewPostsFailure)
  console.log('sign in working')
  $('#view-user-posts-btn').removeClass('hidden')
  $('#account-menu').removeClass('hidden')
  $('#create-post-btn').removeClass('hidden')
  $('#sign-up-menu').addClass('hidden')
  $('#sign-in-menu').addClass('hidden')
}

function signOutSuccess () {
  console.log('sign out is working')
  $('#sign-up-menu').removeClass('hidden')
  $('#sign-in-menu').removeClass('hidden')
  $('#view-user-posts-btn').addClass('hidden')
  $('#account-menu').addClass('hidden')
  $('#create-post-btn').addClass('hidden')
  $('#content').html('')
}

// FAILURES

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

function signUpFailure () {
  console.log('signUp failed')
}

function signInFailure () {
  console.log('sign in failed')
}

function signOutFailure () {
  console.log('sign out failed')
}

function changePasswordSuccess () {
  console.log('change password working')
}

function changePasswordFailure () {
  console.log('change password failed')
}

function showWritePost () {
  $('#content').addClass('hidden')
  $('#create-post-menu').removeClass('hidden')
}

module.exports = {
  signUpSuccess,
  signInSuccess,
  signInFailure,
  signUpFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure,
  viewPostsSuccess,
  viewUserPostsSuccess,
  viewPostsFailure,
  createPostSuccess,
  createPostFailure,
  showWritePost,
  deletePostsSuccess,
  deletePostsFailure,
  updatePostsSuccess
}
