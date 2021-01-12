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
  published: true,
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

const db = {
  users,
  posts,
  comments
}

export { db as default }