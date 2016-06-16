var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    name: {
        type: String,
        index: { unique: true }
    },
    score: {
    	type: Number,
    	default: 0
    }
});