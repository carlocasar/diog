const { buildSchema} = require ('graphql');

module.exports = buildSchema(`
type Comment {
  _id: ID!
  answer: String!
  event: Event!
  user: User!
  createdAt: String!
  updatedAt: String!
}

type Event {
  _id: ID!
  title: String! 
  description: String!
  creator: User!
  comments: [Comment!]
  tags: [Tag!]
  project: Project
  createdAt: String!
  updatedAt: String!
}

type User {
  _id: ID! 
  email: String! 
  password: String
  createdEvents: [Event!]
  createdComments: [Comment!]
}

type Tag {
  _id: ID!
  name: String!
  description: String
  events: [Event!]
}

type Project {
  _id: ID!
  name: String!
  description: String
  events: [Event!]
}

input EventInput {
  title: String! 
  description: String!
}

input UserInput {
  email: String! 
  password: String!
}

input CommentInput {
  answer: String! 
  userId: ID! 
  eventId: ID!
}

type RootQuery {
  events: [Event!]!
  comments: [Comment!]!
} 

type RootMutation {
  createEvent(eventInput: EventInput): Event
  createUser(userInput: UserInput): User
  createComment(commentInput: CommentInput): Comment
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);