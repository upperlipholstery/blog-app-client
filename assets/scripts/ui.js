'use strict'

function showWriteTome () {
  $('#tome-content').addClass('hidden')
  $('.account-page').addClass('hidden')
  $('#create-tome-menu').removeClass('hidden')
}

function showAccount () {
  $('#tome-content').addClass('hidden')
  $('#create-tome-menu').addClass('hidden')
  $('.account-page').removeClass('hidden')
}

module.exports = {
  showWriteTome,
  showAccount
}
