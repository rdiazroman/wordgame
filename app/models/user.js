var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    name: {
        type: String,
        default: ''
    },
    score: {
    	type: Number,
    	default: 0
    }
});