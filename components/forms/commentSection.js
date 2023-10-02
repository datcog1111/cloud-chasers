import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { getComments, createComment, deleteComment } from '../../api/commentData';
import { useAuth } from '../../utils/context/authContext';

export default function CommentsSection({ cloudFirebaseKey }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  const deleteThisComment = (firebaseKey) => {
    if (window.confirm('Delete comment?')) {
      deleteComment(firebaseKey).then(() => getComments(cloudFirebaseKey).then(setComments));
    }
  };

  useEffect(() => {
    getComments(cloudFirebaseKey).then((comment) => {
      setComments(comment);
    });
  }, [cloudFirebaseKey]);

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      text: newComment,
      cloudFirebaseKey,
      userUID: user.uid,
      userDisplayName: user.displayName,
      time: new Date().toString(),
    };
    createComment(payload).then(() => {
      getComments(cloudFirebaseKey).then(setComments);
      setNewComment('');
    });
  };
  return (
    <div>
      <h3>Comments</h3>
      <div className="comments-section">
        {comments.map((comment) => (
          <div key={comment.firebaseKey} className="comment-card">
            <h4>{comment.userDisplayName}</h4>
            <span className="comment-date">{comment.time}</span>
            <p>{comment.text}</p>
            <Button variant="danger" onClick={() => deleteThisComment(comment.firebaseKey)} className="mb-2">
              Delete
            </Button>
          </div>
        ))}
      </div>
      <Form onSubmit={handleSubmit}>
        <input type="text" value={newComment} onChange={handleChange} placeholder="add a comment" />
        <Button type="submit">Add Comment</Button>
      </Form>
    </div>
  );
}

CommentsSection.propTypes = {
  cloudFirebaseKey: PropTypes.string.isRequired,
};
