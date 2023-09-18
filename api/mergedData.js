import { deleteCloud } from './cloudData';
import { getComments, deleteComment } from './commentData';

const deleteCloudComments = (cloudFirebaseKey) => new Promise((resolve, reject) => {
  getComments(cloudFirebaseKey).then((cloudArray) => {
    const deleteCommentPromises = cloudArray.map((comment) => deleteComment(comment.firebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteCloud(cloudFirebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});

export default deleteCloudComments;
