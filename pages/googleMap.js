import Map from '../components/map';

export default function GoogleMap() {
  return (
    <Map zoom={10} center={{ lat: 36, lng: -86 }} mapContainerClassName="map-container" />
  );
}
