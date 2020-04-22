'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const postEvents = require('./posts/events')
const authEvents = require('./auth/events')
const ui = require('./ui')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // AUTH EVENTS
  $('#sign-up-btn').on('click', authEvents.onSignUp)
  $('#sign-in-btn').on('click', authEvents.onSignIn)
  $('.change-password-button').on('click', authEvents.onChangePassword)
  $('#sign-out-btn').on('click', authEvents.onSignOut)

  // POST EVENTS
  $('#view-posts-btn').on('click', postEvents.onViewPosts)
  $('#view-user-posts-btn').on('click', postEvents.onUserViewPosts)

  // View actions
  $('.content').on('click', '.view-modal', postEvents.selectView)

  // Update actions
  $('.update-button').on('click', postEvents.onUpdatePractice)
  $('.cancel-update').on('click', postEvents.cancelUpdate)
  $('.content').on('click', '.update-modal', postEvents.selectUpdate)

  // create action
  $('#create-post').on('submit', postEvents.onCreatePost)
  $('#create-post-btn').on('click', ui.showWritePost)
})
