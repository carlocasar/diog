const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tagsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    events: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

module.exports = mongoose.model('Tag', tagsSchema); 