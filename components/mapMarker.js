/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
import { Card } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
// import { useRouter } from 'next/router';
import { useState } from 'react';
import CustomInfoWindow from './infoWindow';

export default function MapMarker({ cloudObj, onMarkerClick, isSelected }) {
  const [isHovered, setIsHovered] = useState(false);
  // const router = useRouter();

  const viewFoundCloud = (e) => {
    e.stopPropagation();
    if (typeof onMarkerClick === 'function') {
      onMarkerClick();
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <Card
        style={{
          width: '50px',
          transform: isHovered ? 'scale(1.01)' : '',
          boxShadow: isHovered ? '0 0 10px rgba(0, 0, 0.3)' : '',
          cursor: isHovered ? 'pointer' : '',
        }}
        onClick={viewFoundCloud}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {cloudObj.image
          ? <Card.Img variant="top" src={cloudObj.imageUrl} alt="cloud" style={{ height: '50px' }} />
          : <Card.Img variant="top" src={cloudObj.imageUrl} alt="thing" style={{ height: '50px' }} />}
      </Card>
      {isSelected && <CustomInfoWindow cloud={cloudObj} />}
    </>
  );
}

MapMarker.propTypes = {
  cloudObj: PropTypes.shape({
    imageUrl: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
  onMarkerClick: PropTypes.func,
  isSelected: PropTypes.bool,
};

MapMarker.defaultProps = {
  cloudObj: {
    image: '',
    firebaseKey: '',
    uid: '',
  },
  onMarkerClick: null,
  isSelected: false,
};
