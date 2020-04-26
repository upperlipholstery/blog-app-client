'use strict'
const store = require('../../store')

const noteOwner = (note) => {
  console.log('test')
  console.log(store.user._id === note.owner)
  return store.user._id === note.owner
}

module.exports = noteOwner
