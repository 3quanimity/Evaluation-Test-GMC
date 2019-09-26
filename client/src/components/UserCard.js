import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

function UserCard({ user: { id, name, username, email, phone, website } }) {
  return (
    <Card className='col-md-3 px-0 mx-3 mb-3'>
      <Card.Header>{username}</Card.Header>
      <Card.Body>
        <Card.Subtitle
          className='mb-2 text-muted'
          style={{ fontSize: '1.5rem' }}
        >
          {name}
        </Card.Subtitle>
        <Card.Text>Email: {email}</Card.Text>
        <Card.Text>Phone: {phone}</Card.Text>
        <Card.Text>
          Website: <Link to='#'>{website}</Link>
        </Card.Text>
        <Link
          to={`/users/${id}`}
          className='btn btn-primary'
          style={{ fontSize: '1.5rem' }}
        >
          View Profile
        </Link>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
