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
    <div className="gallery">
      <Image src={cloudObj.imageUrl} alt="cloud" className="cloud-pic" onClick={itemClick} style={{ width: '100%' }} />
    </div>
  );
}

CloudPic.propTypes = {
  cloudObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    firebaseKey: PropTypes.string,

  }).isRequired,
};

export default CloudPic;
