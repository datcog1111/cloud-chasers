import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getComments = (cloudFirebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comment.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const allComments = Object.values(data);
      const filteredComments = allComments.filter((comment) => comment.cloudFirebaseKey === cloudFirebaseKey);
      resolve(filteredComments);
    })
    .catch(reject);
});

const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comment.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comment/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comment/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comment/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getComments,
  createComment,
  deleteComment,
  updateComment,
  getSingleComment,
};
