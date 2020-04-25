'use strict'

const ui = require('./ui')
const api = require('./api')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')
const updateCommentTemplate = require('../templates/update-comment-template.handlebars')

function cancelDeleteComment () {
  $(`.main-comment-buttons`).removeClass('hidden')
  $(`.delete-check[data-id=${store.deleteCommentId}]`).addClass('hidden')
  $(`.delete-comment[data-id=${store.deleteCommentId}]`).removeClass('hidden')
}

module.exports = {
  cancelDeleteComment
}
