import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//creating the query
const COMMENTS_QUERY = gql`
  query Comments_Query($postId: ID!) {
    comments(postId: $postId) {
      postId
      id
      name
      email
      body
    }
  }
`;

class Comments extends Component {
  render() {
    // pulling the userId out of the params
    let { postId } = this.props.match.params;
    //converting to int
    postId = parseInt(postId);
    console.log(postId);

    return (
      <div>
        <Query query={COMMENTS_QUERY} variables={{ postId }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            console.log(data);
            // destructuring
            {
              /* const { postId, id, name, email, body } = data.comment; */
            }

            return (
              <div>
                <Card.Header className='display-4 my-3 text-center'>
                  Comments
                </Card.Header>
                {data.comments.map(({ postId, id, name, email, body }) => (
                  <Card key={id}>
                    <Card.Header style={{ fontSize: '1.5rem' }}>
                      {email.toUpperCase()}
                    </Card.Header>
                    <Card.Body>
                      <Card.Text style={{ fontSize: '1.5rem' }}>
                        {body}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
                <Link
                  to='/'
                  className='btn btn-primary'
                  style={{ fontSize: '1.5rem' }}
                >
                  Home
                </Link>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Comments;
