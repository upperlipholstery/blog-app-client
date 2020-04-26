'use strict'

const breaklines = function (text) {
  console.log(text)
  text = text.replace(/(\r\n|\n|\r)/gm, '<br>')
  console.log(text)
  return text
}

module.exports = breaklines
