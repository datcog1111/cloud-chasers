/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';

export default function CustomInfoWindow({ cloud }) {
  return (
    <div style={{
      padding: '10px',
      background: 'white',
      borderRadius: '5px',
      boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
      maxWidth: '400px',
    }}
    >
      <img src={cloud.imageUrl} alt={cloud.type} style={{ width: '400px', height: '250px' }} />
    </div>
  );
}

CustomInfoWindow.propTypes = {
  cloud: PropTypes.shape({
    imageUrl: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};
