'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const postEvents = require('./posts/events')
const authEvents = require('./auth/events')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('#sign-up-btn').on('click', authEvents.onSignUp)
  $('#sign-in-btn').on('click', authEvents.onSignIn)
  $('.change-password-button').on('click', authEvents.onChangePassword)
  $('#sign-out-btn').on('click', authEvents.onSignOut)

  $('#view-posts-btn').on('click', postEvents.onViewPosts)
  $('#view-user-posts-btn').on('click', postEvents.onUserViewPosts)

  // View actions
  $('.content').on('click', '.view-modal', postEvents.selectView)

  // Update actions
  $('.update-button').on('click', postEvents.onUpdatePractice)
  $('.cancel-update').on('click', postEvents.cancelUpdate)
  $('.content').on('click', '.update-modal', postEvents.selectUpdate)
})
