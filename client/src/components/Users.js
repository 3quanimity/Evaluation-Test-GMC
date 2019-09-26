import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import UserCard from './UserCard';

//creating the query
const USERS_QUERY = gql`
  query UsersQuery {
    users {
      id
      name
      username
      email
      phone
      website
    }
  }
`;

export class Users extends Component {
  render() {
    return (
      <div>
        <h1 className='display-4 my-3 text-center'>Users</h1>
        <Query query={USERS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return (
              /*<div className='d-flex flex-wrap justify-content-center'>*/
              <div
                className='row justify-content-center'
                style={{ fontSize: '1.5rem' }}
              >
                {data.users.map(user => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Users;
