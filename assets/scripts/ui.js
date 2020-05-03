'use strict'

const profileEvents = require('./profile/events')

function showWriteTome () {
  $('#tome-content').addClass('hidden')
  $('.account-page').addClass('hidden')
  $('#tomes-message').addClass('hidden')
  $('#create-tome-menu').removeClass('hidden')
}

function showAccount () {
  profileEvents.onUserProfile()
  $('#tome-content').addClass('hidden')
  $('#create-tome-menu').addClass('hidden')
  $('#tomes-message').addClass('hidden')
  $('.account-page').removeClass('hidden')
}

module.exports = {
  showWriteTome,
  showAccount
}
