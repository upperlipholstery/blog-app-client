const ui            = require('./ui'),
      api           = require('./api'),
      getFormFields = require('../../../lib/get-form-fields')


const onViewPosts = function(event) {
    event.preventDefault()
    api.postsIndex()
        .then(ui.viewPostsSuccess)
        .catch(ui.viewPostsFailure)
}

module.exports = {
    onViewPosts
}