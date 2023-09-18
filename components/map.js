/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import GoogleMapReact from 'google-map-react';
import {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import MapMarker from './mapMarker';
import { getClouds } from '../api/cloudData';

const mapApiKey = 'AIzaSyCu92hbb5Tmp05_FqxJKpMUK4-Wy7bscmY';

export default function Map({ mapOnForm, onClick }) {
  const [markers, setMarkers] = useState([]);
  const [formMarker, setFormMarker] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getClouds().then((cloudArr) => {
      setMarkers(cloudArr);
    });
  });

  const handleMapClick = ({ lat, lng }) => {
    setFormMarker({ lat, lng });
    onClick({ lat, lng });
  };

  const defaultProps = {
    center: {
      lat: 36.162663,
      lng: -86.781601,
    },
    zoom: 9,
  };

  // const mapRef = useRef();
  // const onMapLoad = useCallback((map) => {
  //   mapRef.current = map;
  // }, []);

  return (
    <div style={{
      height: '75vh',
      width: '75%',
      marginLeft: '15%',
      position: 'absolute',
      top: '50%',
      transform: 'translate(0, -50%)',
      border: 'solid black 3px',
    }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: mapApiKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={handleMapClick}
      >
        {formMarker && mapOnForm ? (
          <MapMarker key={formMarker.lat} lat={formMarker.lat} lng={formMarker.lng} cloudObj={{}} />
        ) : null}
        {!mapOnForm ? markers?.map((cloud) => (
          <MapMarker
            key={cloud.firebaseKey}
            lat={cloud.lat}
            lng={cloud.lng}
            cloudObj={cloud}
            isSelected={selected && selected.firebaseKey === cloud.firebaseKey}
            onMarkerClick={() => {
              if (selected && selected.firebaseKey === cloud.firebaseKey) {
                setSelected(null);
              } else {
                setSelected(cloud);
              }
            }}
          />
        )) : null}

      </GoogleMapReact>
    </div>
  );
}

Map.propTypes = {
  mapOnForm: PropTypes.bool,
  onClick: PropTypes.func,
};

Map.defaultProps = {
  mapOnForm: false,
  onClick: () => {},
};
