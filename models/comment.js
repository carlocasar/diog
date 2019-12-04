const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    answer: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Event'
    } 
},
    { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema); 