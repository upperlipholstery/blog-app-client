'use strict'
const store = require('../../store')

const noteOwner = (note) => {
  return store.user._id === note.owner
}

module.exports = noteOwner
