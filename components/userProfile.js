/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';
// import Head from 'next/head';
// import PropTypes from 'prop-types';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { getUserClouds } from '../api/cloudData';
import CloudPic from './cloudCard';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();
  const [clouds, setClouds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllTheClouds = () => {
    getUserClouds(user.uid).then((cloudData) => {
      setClouds(cloudData);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getAllTheClouds();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div><h1>{user.displayName}</h1>
      <Image src={user.photoURL} alt="user" className="profile-image" width="100px" height="100px" />
      <h6><b>Last Log In: </b> {user.metadata.lastSignInTime}</h6>

      <ResponsiveMasonry>
        <Masonry
          breakpointCols={3}
          className="masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {clouds.map((cloud) => (
            <CloudPic key={cloud.firebaseKey} cloudObj={cloud} onUpdate={getAllTheClouds} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>

  );
}

// UserProfile.propTypes = {
//   userObj: PropTypes.shape({
//     displayName: PropTypes.string,
//     lastSignInTime: PropTypes.string,
//     uid: PropTypes.string,
//   }).isRequired,
// };
