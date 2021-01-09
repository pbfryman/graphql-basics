const Query = {
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users
    }

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase())
    })
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts
    }

    return db.posts.filter((post) => {
      const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
      const isBodyMatch = post.body.toLocaleLowerCase().includes(args.query.toLowerCase())
      return isTitleMatch || isBodyMatch
    })
  },
  comments(parent, args, { db }, info) {
    return db.comments
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
}

export { Query as default }