import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

function PostCard({ post: { id, userId, title, body } }) {
  return (
    <Card.Body>
      <Card.Title className='text-primary' style={{ fontSize: '2.5rem' }}>
        {title.toUpperCase()}
      </Card.Title>
      <Card.Text style={{ fontSize: '1.5rem' }}>{body}</Card.Text>

      <Link
        to={`/comments/${id}`}
        className='btn btn-primary'
        style={{ fontSize: '1.5rem' }}
      >
        View Comments
      </Link>
      <hr />
    </Card.Body>
  );
}

export default PostCard;
