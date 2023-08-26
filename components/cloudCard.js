import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Image } from 'react-bootstrap';

function CloudPic({ cloudObj }) {
  const router = useRouter();
  const itemClick = () => {
    if (cloudObj.firebaseKey) {
      router.push(`/clouds/${cloudObj.firebaseKey}`);
    }
  };
  return (
    <Image src={cloudObj.image} alt="cloud" onClick={itemClick} max-width="auto" max-height="auto" />
  );
}

CloudPic.propTypes = {
  cloudObj: PropTypes.shape({
    image: PropTypes.string,
    firebaseKey: PropTypes.string,

  }).isRequired,
};

export default CloudPic;
