const { gql } = require('apollo-server-express');


const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Friend {
        username: String!
    }

    input Friend {
        username: String!
    }

    type Message {
        _id: ID!
        content: String!
        sentBy: String!
        seen: Boolean!
    }

    input MessageInput {
        content: String!
        sentBy: String!
        seen: Boolean!
    }

    type notifications {
        acceptable: Boolean!
        content: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User,
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addFriend(username: String!, input: MessageInput): User
        addMessage(input: MessageInput)
        removeFriend(username: String!): User
        removeMessage(input: MessageInput): User
    }
`

module.exports = typeDefs