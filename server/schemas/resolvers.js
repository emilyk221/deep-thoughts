const { User, Thought } = require('../models');

const resolvers = {
  Query: {
    // find all thoughts, find all thoughts by username
    thoughts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Thought.find(params).sort({ createdAt: -1 });
    },
    // find one thought by id
    thought: async (parent, { _id }) => {
      return Thought.findOne({ _id });
    },
    // find all users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    },
    // find one user by username
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('thoughts');
    }
  }
};

module.exports = resolvers;