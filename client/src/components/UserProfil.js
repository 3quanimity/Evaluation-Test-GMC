import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PostCard from './PostCard';

//creating the queries
const USER_QUERY = gql`
  query User_Query($userId: ID!) {
    user(userId: $userId) {
      id
      name
      username
      email
      phone
      website
    }
  }
`;

const POSTS_QUERY = gql`
  query Posts_Query($userId: ID!) {
    posts(userId: $userId) {
      userId
      id
      title
      body
    }
  }
`;

export class UserProfil extends Component {
  render() {
    // pulling the userId out of the params
    let { userId } = this.props.match.params;
    //converting to int
    userId = parseInt(userId);
    console.log(userId);

    return (
      <Fragment>
        {/* user info  */}
        {/* since we have an argument we need to add "variables" in addition to query  */}
        <Query query={USER_QUERY} variables={{ userId }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(`mmmmmmmmmmmm ${error}`);
            console.log(data);
            // destructuring
            const { id, name, username, email, phone, website } = data.user;

            return (
              <Fragment>
                <Card>
                  <Card.Img
                    variant='top'
                    src='https://i.imgur.com/xHntYsg.jpg'
                  />
                  <Card.Body style={{ position: 'relative' }}>
                    <Image
                      style={{
                        position: 'absolute',
                        borderRadius: '50%',
                        left: '40%',
                        width: '20%',
                        top: '-50%',
                        padding: '10px',
                        backgroundColor: 'white'
                      }}
                      src='https://cdn4.iconfinder.com/data/icons/cool-avatars-2/190/00-36-512.png'
                    />
                    <Card.Text>
                      <h2>Name: {name}</h2>
                      <h2>Username: {username}</h2>
                      <h2>Email: {email}</h2>
                      <h2>Phone: {phone}</h2>
                      <h2>Website: {website}</h2>
                    </Card.Text>
                    <Link
                      to='/'
                      className='btn btn-secondary'
                      style={{ fontSize: '1.5rem' }}
                    >
                      Back
                    </Link>
                  </Card.Body>
                </Card>
              </Fragment>
            );
          }}
        </Query>

        {/* user posts  */}
        <Query query={POSTS_QUERY} variables={{ userId }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return (
              /*<div className='d-flex flex-wrap justify-content-center'>*/

              <Card>
                <Card.Header className='display-4 my-3 text-center'>
                  Posts
                </Card.Header>
                {data.posts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </Card>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

export default UserProfil;
