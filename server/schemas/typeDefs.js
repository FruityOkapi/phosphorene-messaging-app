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

    input Message {
        content: String!
        sentBy: String!
        seen: Boolean!
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
        addFriend(username: String!): User
        addMessage(_id: ID!, content: String!, sentBy: String!, seen: Boolean!)
        removeFriend(username: String!): User
        removeMessage(_id: ID!): User
    }
`

module.exports = typeDefs