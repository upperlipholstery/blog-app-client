const   store     = require('../store'),
        config  = require('../config')


const viewPosts = function() {
    return $.ajax({
        url: config.apiUrl + '/posts',
        method: 'GEt'
    })
}

module.exports = {
    viewPosts
}

