const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

// DEFINING TYPES ***************************************************************************************************************************
// defining the UserType
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    website: { type: GraphQLString }
    // relations to other objectTypes
    // address: { type: AddressType },
    // company: { type: CompanyType }
  })
});

// defining the PostType
const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    userId: { type: GraphQLID },
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString }
    //!\ Note to self: might need to declare relation to comments
  })
});

// defining the CommentType
const CommentType = new GraphQLObjectType({
  name: 'Comment',
  fields: () => ({
    postId: { type: GraphQLID },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    body: { type: GraphQLString }
  })
});

//ROOT QUERY ********************************************************************************************************************************************
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      description: 'get all users',
      type: new GraphQLList(UserType),
      resolve() {
        return axios
          .get('https://jsonplaceholder.typicode.com/users')
          .then(res => res.data);
      }
    },

    user: {
      description: 'get a single user by userID',
      type: UserType,
      args: {
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return axios
          .get(`https://jsonplaceholder.typicode.com/users/${args.userId}`)
          .then(res => res.data);
      }
    },

    posts: {
      description: 'get all posts of a single user by userID',
      type: new GraphQLList(PostType),
      args: {
        userId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://jsonplaceholder.typicode.com/posts?userId=${args.userId}`
          )
          .then(res => res.data);
      }
    },

    comments: {
      description: 'get all comments of a single post by postID',
      type: new GraphQLList(CommentType),
      args: {
        postId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://jsonplaceholder.typicode.com/comments?postId=${args.postId}`
          )
          .then(res => res.data);
      }
    }
  }
});

//EXPORTING THE SCHEMA **********************************************************************************************************************
module.exports = new GraphQLSchema({
  query: RootQuery
});
