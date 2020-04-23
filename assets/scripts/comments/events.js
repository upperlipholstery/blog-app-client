'use strict'

const ui = require('../ui')
const api = require('./api')
const store = require('../store')
const getFormFields = require('../../../lib/get-form-fields')

function onCreateComment (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  data.comment.postId = store.viewItemId
  console.log(data)
  api.createComment(data)
    .then(ui.createCommentSuccess)
    .catch(ui.createCommentFailure)
}

module.exports = {
  onCreateComment
}
