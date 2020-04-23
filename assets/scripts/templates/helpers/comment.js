'use strict'
const store = require('../../store')

const commentOwner = (comment) => {
  console.log('test')
  console.log(store.user._id === comment.owner)
  return store.user._id === comment.owner
}

module.exports = commentOwner
