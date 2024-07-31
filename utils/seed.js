const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');

  // Clear existing data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Create sample users
  const users = await User.insertMany([
    {
      username: 'user1',
      email: 'user1@example.com'
    },
    {
      username: 'user2',
      email: 'user2@example.com'
    },
    {
      username: 'user3',
      email: 'user3@example.com'
    }
  ]);

  // Create sample thoughts
  const thoughts = await Thought.insertMany([
    {
      thoughtText: 'This is a thought from user1',
      username: users[0].username,
      reactions: [
        {
          reactionBody: 'Great thought!',
          username: users[1].username
        },
        {
          reactionBody: 'Thanks for sharing!',
          username: users[2].username
        }
      ]
    },
    {
      thoughtText: 'Another thought from user2',
      username: users[1].username,
      reactions: [
        {
          reactionBody: 'Interesting perspective.',
          username: users[0].username
        }
      ]
    }
  ]);

  // Associate thoughts with users
  users[0].thoughts.push(thoughts[0]._id);
  users[1].thoughts.push(thoughts[1]._id);

  // Save updated users
  await users[0].save();
  await users[1].save();

  // Add friends
  users[0].friends.push(users[1]._id, users[2]._id);
  users[1].friends.push(users[0]._id);
  users[2].friends.push(users[0]._id);

  // Save updated users
  await users[0].save();
  await users[1].save();
  await users[2].save();

  console.log('Database seeded!');
  mongoose.connection.close();
});
