/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Form, FloatingLabel, Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCloud, updateCloud } from '../../api/cloudData';
import Map from '../map';

const initialState = {
  image: '',
  type: '',
  description: '',
  lat: '',
  lng: '',
};

function CloudForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const [cloudType, setCloudType] = useState('stratus');
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onRadioChange = (e) => {
    setCloudType(e.target.value);
  };

  const handleMapClick = (e) => {
    setFormInput((prevState) => ({
      ...prevState,
      lat: e.lat,
      lng: e.lng,
    }));
  };

  const toggleMap = () => {
    setIsMapModalOpen(!isMapModalOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      formInput.type = cloudType;
      updateCloud(formInput).then(() => router.push(`/clouds/${obj.firebaseKey}`));
    } else {
      const payload = {
        ...formInput, type: cloudType, uid: user.uid, timeSubmitted: Date().toString(),
      };
      createCloud(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCloud(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white-mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Cloud</h2>

      <FloatingLabel controlId="floatingInput" label="Cloud Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter Cloud Image"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Group controlId="stratus" className="mb-3">
        <Form.Check
          type="radio"
          name="type"
          value="stratus"
          checked={cloudType === 'stratus'}
          onChange={onRadioChange}
        />
      </Form.Group>
      <Form.Group controlId="cumulus" className="mb-3">
        <Form.Check
          type="radio"
          name="type"
          value="cumulus"
          checked={cloudType === 'cumulus'}
          onChange={onRadioChange}
        />
      </Form.Group>
      <Form.Group controlId="cirrocumulus" className="mb-3">
        <Form.Check
          type="radio"
          name="type"
          value="cirrocumulus"
          checked={cloudType === 'cirrocumulus'}
          onChange={onRadioChange}
        />
      </Form.Group>
      <Form.Group controlId="stratocumulus" className="mb-3">
        <Form.Check
          type="radio"
          name="type"
          value="stratocumulus"
          checked={cloudType === 'stratocumulus'}
          onChange={onRadioChange}
        />
      </Form.Group>
      <Form.Group controlId="altocumulus" className="mb-3">
        <Form.Check
          type="radio"
          name="type"
          value="altocumulus"
          checked={cloudType === 'altocumulus'}
          onChange={onRadioChange}
        />
      </Form.Group>
      <Form.Group controlId="nimbostratus" className="mb-3">
        <Form.Check
          type="radio"
          name="type"
          value="nimbostratus"
          checked={cloudType === 'nimbostratus'}
          onChange={onRadioChange}
        />
      </Form.Group>
      <Form.Group controlId="cumulonimbus" className="mb-3">
        <Form.Check
          type="radio"
          name="type"
          value="cumulonimbus"
          checked={cloudType === 'cumulonimbus'}
          onChange={onRadioChange}
        />
      </Form.Group>
      <Form.Group controlId="cirrus" className="mb-3">
        <Form.Check
          type="radio"
          name="type"
          value="cirrus"
          checked={cloudType === 'cirrus'}
          onChange={onRadioChange}
        />
      </Form.Group>
      <p>
        Select Cloud: {cloudType}
      </p>

      <FloatingLabel controlId="floatingTextarea" label="description" className="mb-3">
        <Form.Control
          type="type"
          placeholder="Enter A Description"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>
      <div>
        <FloatingLabel controlId="floatingInput1" label="latitude" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Latitude"
            name="lat"
            value={formInput.lat}
            onChange={handleChange}
            required
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingInput1" label="longitude" className="mb-3">
          <Form.Control
            type="text"
            placeholder="longitude"
            name="lng"
            value={formInput.lng}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </div>
      {isMapModalOpen
        ? <><Button onClick={toggleMap}>Close Map</Button> <Map mapOnForm onClick={handleMapClick} style={{}} /></>
        : <Button onClick={toggleMap}> View Map </Button>}

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Submit</Button>
    </Form>
  );
}

CloudForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CloudForm.defaultProps = {
  obj: initialState,
};

export default CloudForm;
