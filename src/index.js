import { GraphQLServer } from 'graphql-yoga'

// Scalar Types - String, Boolean, Int, Float, ID

// Demo user data
const users = [{
  id: '1',
  name: 'Blake',
  email: 'blake@example.com',
  age: 27
}, {
  id: '2',
  name: 'Julie',
  email: 'julie@example.com',
  age: 25
}, {
  id: '3',
  name: 'Olive',
  email: 'olive@example.com',
  age: 3
}, {
  id: '4',
  name: 'Copper',
  email: 'copper@example.com',
  age: 5
}]

// Demo posts data
const posts = [{
  id: '10',
  title: 'GraphQL 101',
  body: 'This is how to use GraphQL...',
  published: true,
  author: '1'
}, {
  id: '11',
  title: 'GraphQL 201',
  body: 'This is an advanced GraphQL post...',
  published: false,
  author: '1'
}, {
  id: '12',
  title: 'Programming Music',
  body: '',
  published: false,
  author: '2'
}]

// Demo comments data
const comments = [{
  id: '1',
  text: 'This is the first comment',
  author: '1',
  post: '10'
}, {
  id: '2',
  text: 'This is the second comment',
  author: '2',
  post: '10'
}, {
  id: '3',
  text: 'This is the third comment',
  author: '3',
  post: '11'
}, {
  id: '4',
  text: 'This is the fourth comment',
  author: '1',
  post: '12'
}]

// Type definitions (application schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, context, info) {
      if (!args.query) {
        return users
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, context, info) {
      if (!args.query) {
        return posts
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLocaleLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })
    },
    comments() {
      return comments
    },
    me() {
      return {
        id: '123098',
        name: 'Julie',
        email: 'julie@example.com',
        age: 25
      }
    },
    post() {
      return {
        id: '1',
        title: 'Title',
        body: 'This is the body',
        published: true
      }
    }
  },
  Post: {
    author(parent, args, context, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    comments(parent, args, context, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      })
    }
  },
  Comment: {
    author(parent, args, context, info) {
      return users.find((user) => {
        return user.id === parent.author
      })
    },
    post(parent, args, context, info) {
      return posts.find((post) => {
        return post.id === parent.post
      })
    }
  },
  User: {
    posts(parent, args, context, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, context, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: typeDefs, // or typeDefs
  resolvers: resolvers // or resolvers
})

server.start(() => {
  console.log('The server is up!')
})