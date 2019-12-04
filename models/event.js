const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tag'
        }
    ],
    projects: 
    {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },   
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]

},
    { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema); 