const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                return User.findOne({_id: context.user._id})
            }
            throw new AuthenticationError('Please log in');
        }
    },

    Mutations: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({email});

            if (!user) {
                throw new AuthenticationError('Email or password is incorrect!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if(!correctPw){ throw new AuthenticationError ('Email or password is incorrect!');
            }

            const token = signToken(user);
            return { token, user };
        }, 
        addFriend: async (parent, Message, context) => {
            if(context.user) {
                const request = await User.findOne({username});
    
                if(!request) {
                    throw new AuthenticationError('User not found!')
                }

                const requestedUser = await request.findOneAndUpdate(
                    { user: request.user._id },
                    { $addToSet: { notifications: Message.input} },
                    { new: true, runValidators: true }
                );
                return requestedUser;
            }

            throw new AuthenticationError('You need to login!')
        },
        // IT MIGHT BE Message.input.sentTo !!!!!  DONT FORGET TO FIX DELETE WITH THE SAME ISSUE IF IM RIGHT !!!!! CANT FIND OUT TIL I GET HOME
        addMessage: async (parent, Message, context) => {
            if(context.user) {
                if(context.user.friends.find((el) => el.username === Message.sentTo)) {
                    const sendMessageLocal = await User.findOneAndUpdate(
                        { user: context.user._id,
                          friends: Message.sentTo },
                        { $addToSet: { chat: Message } },
                        { new: true, runValidators: true }
                    );
                    if (sendMessageLocal) {
                        return User.findOneAndUpdate(
                            { user: Message.sentTo, 
                              friends: context.user._id },
                            { $addToSet: { chat: Message }},
                            { new: true, runValidators: true }
                        );    
                    }
                    throw new AuthenticationError('Could not begin to send message!');
                }
                throw new AuthenticationError('You are not friends with that person!')
            }
            throw new AuthenticationError('You need to log in!');
        },
        removeFriend:  async (parent, { username }, context) => {
            if(context.user) {
                return User.findOneAndDelete(
                    { user: context.user._id,
                      friends: username }
                )
            }
            throw new AuthenticationError('You need to log in!')
        },
        removeMessage: async (parent, Message, context) => {
            if(context.user) {
                return User.findOneAndDelete(
                    { user: context.user._id,
                      friends: Message.sentTo,
                      chat: Message._id }
                )
            }
        },
        updateMessage: async (parent, Message, context) => {
            if(context.user) {
                return User.findOneAndUpdate(
                    { user: context.user._id,
                      friends: Message.sendTo,
                      chat: Message._id },
                    { Message }
                )
            }
        },

    }
};

module.exports = resolvers; 