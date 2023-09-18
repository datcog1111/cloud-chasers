import { storage } from '../utils/client';

const photoStorage = {
  upload(file, uid) {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`${uid}/${file.name}`);
      fileRef.put(file).then(() => {
        storage.ref(`${uid}`).child(file.name).getDownloadURL().then((url) => {
          const imageObj = { imageUrl: url, filePath: `${uid}/${file.name}` };
          resolve(imageObj);
        });
      })
        .catch(reject);
    });
  },
  delete() {
  },
};

export default photoStorage;
