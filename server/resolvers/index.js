const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');
const Comment = require('../../models/comment');


const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });
        return events.map(event => {
            return {
                ...event._doc,
                _id: event.id,
                createdAt: new Date(event._doc.createdAt).toISOString(),
                updatedAt: new Date(event._doc.updatedAt).toISOString(),
                creator: user.bind(this, event.creator)
            };
        });
    }
    catch (err) {
        throw err;
    }
};

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return {
            ...event._doc,
            createdAt: new Date(event._doc.createdAt).toISOString(),
            updatedAt: new Date(event._doc.updatedAt).toISOString(),
            creator: user.bind(this, event._doc.creator)
        };
    } catch (err) {
        throw err;
    }
}

const user = async userId => {
    try {
        const user = await User.findById(userId);
        return { ...user._doc, createdEvents: events.bind(this, user._doc.createdEvents) };
    }
    catch (err) {
        throw err;
    }
};

module.exports = {
    events: async () => {
      try {
            const events = await Event.find();
            return events.map(event => {
                return {
                    ...event._doc,
                    createdAt: new Date(event._doc.createdAt).toISOString(),
                    updatedAt: new Date(event._doc.updatedAt).toISOString(),
                    creator: user.bind(this, event._doc.creator)
                };
            });
        }
        catch (err) {
            throw err;
        }
    },
    comments: async () => { 
        try { 
            const comments = await Comment.find();
            return comments.map(comment => {
                return {
                    ...comment._doc,
                    creator: user.bind(this, comment._doc.creator),
                    event: singleEvent.bind(this,comment._doc.event),
                    createdAt: new Date(comment._doc.createdAt).toISOString(),
                    updatedAt: new Date(comment._doc.updatedAt).toISOString()
                };
            });
        }
        catch (err) {
            throw err;
        }
    },
    createEvent: async (args) => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        creator: '5dcda0a384a5fc42f4c04264'
      });
      let createdEvent;
      try {
            const result = await event.save();
            createdEvent = {
                ...result._doc,
                createdAt: new Date(result._doc.createdAt).toISOString(),
                updatedAt: new Date(result._doc.updatedAt).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };
            const creator = await User.findById('5dcda0a384a5fc42f4c04264');
            if (!creator) {
                throw new Error('User not found.');
            }
            creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;
        }
        catch (err) {
            console.log(err + "eieieie");
            throw err;
        }
    },
    createUser: async args => {
      try {
            const user = await User.findOne({ email: args.userInput.email });
            if (user) {
                throw new Error('User already exists');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user_1 = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const result = await user_1.save();
            return { ...result._doc, password: null };
        }
        catch (err) {
            throw err;
        }
    },
    createComment: async args => {
        const fetchedEvent = await Event.findOne({_id: args.commentInput.eventId})
        try {
            const comment = new Comment({
                creator: '5dcda0a384a5fc42f4c04264',
                event: fetchedEvent,
                answer: args.commentInput.answer
            });
            const result = await comment.save();
            return {
                ...result._doc,
                creator: user.bind(this, comment._doc.creator),
                event: singleEvent.bind(this,comment._doc.event),
                createdAt: new Date(comment._doc.createdAt).toISOString(),
                updatedAt: new Date(comment._doc.updatedAt).toISOString()
            };
        } catch (err) {
            throw err;
        }
    }
  };