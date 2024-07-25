const { Schema, model } = require('mongoose');



const Thought = model('thought', thoughtSchema);

module.exports = Thought;