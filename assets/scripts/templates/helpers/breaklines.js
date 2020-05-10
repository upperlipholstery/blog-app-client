'use strict'

const breaklines = function (text) {
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>')
  return text
}

module.exports = breaklines
