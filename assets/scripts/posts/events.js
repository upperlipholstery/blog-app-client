'use strict'

const ui = require('../ui')
const api = require('./api')
// const getFormFields = require('../../../../lib/get-form-fields')

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

module.exports = {
  onViewPosts,
  onUserViewPosts
}
