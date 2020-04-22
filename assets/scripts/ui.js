'use strict'

const store = require('./store')
const showPostsTemplate = require('./templates/blog-post.handlebars')
const showUserPostsTemplate = require('./templates/owner-blog-posts.handlebars')
const api = require('./posts/api')

// POSTS CRUD
function viewPostsSuccess (data) {
  console.log('viewpost')
  const showPostsHtml = showPostsTemplate({posts: data.posts})
  $('.content').html(showPostsHtml)
}

function viewUserPostsSuccess (data) {
  const showUserPostsHtml = showUserPostsTemplate({posts: data.posts})
  $('.content').html(showUserPostsHtml)
}

function viewPostsFailure () {
  console.log('viewPosts failed')
}

// AUTHENTICATION

function signUpSuccess (data) {
  store.user = data.user
  console.log('signUp working')
}

function signInSuccess (data) {
  store.user = data.user
  api.viewPosts()
    .then(viewPostsSuccess)
    .catch(viewPostsFailure)
  console.log('sign in working')
}

function signUpFailure () {
  console.log('signUp failed')
}

function signInFailure () {
  console.log('sign in failed')
}

function signOutSuccess () {
  console.log('sign out is working')
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
  viewUserPostsSuccess
}
