import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createCloud, updateCloud } from '../../api/cloudData';

const initialState = {
  image: '',
  type: '',
  description: '',
  location: '',
};

function CloudForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();
  const [type, setType] = useState('stratus');

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
    setType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      formInput.type = type;
      updateCloud(formInput).then(() => router.push(`/cloud/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
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
          checked={type === 'stratus'}
          onChange={onRadioChange}
        />
        <label htmlFor="stratus">Stratus</label>
      </Form.Group>
      <Form.Group controlId="cumulus" className="mb-3">
        <Form.Check
          type="radio"
          name="type"
          value="cumulus"
          checked={type === 'cumulus'}
          onChange={onRadioChange}
        />
      </Form.Group>
      <p>
        Select Cloud: {type}
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

      <FloatingLabel controlId="floatingInput" label="location" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter A Location"
          name="location"
          value={formInput.location}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

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
