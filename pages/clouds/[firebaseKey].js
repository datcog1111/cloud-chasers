/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
// import Head from 'next/head';
import { getSingleCloud, deleteCloud } from '../../api/cloudData';
import CommentsSection from '../../components/forms/commentSection';
import { useAuth } from '../../utils/context/authContext';

export default function ViewCloud() {
  const [cloudDetails, setCloudDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  const { user } = useAuth();

  const isCurrentUserCreator = cloudDetails.uid === user.uid;

  const deleteThisCloud = () => {
    deleteCloud(cloudDetails.firebaseKey).then(() => (router.push('/')));
  };

  useEffect(() => {
    getSingleCloud(firebaseKey).then(setCloudDetails);
  }, [firebaseKey]);

  return (
    <div className="details-container">
      <div className="image-details mt-5 d-flex flex-wrap">
        {cloudDetails.imageUrl && (
        <div className="d-flex flex-column">
          <img src={cloudDetails.imageUrl} alt={cloudDetails.description} style={{ width: '400px' }} />
        </div>
        )}
        <div className="text-black ms-5 details">
          <h5>
            Cloud Type:
            {cloudDetails.type}
          </h5>
          <p>{cloudDetails.description}</p>
          <h3>{cloudDetails.location}</h3>
          <h6>{cloudDetails.timestamp}</h6>
          {isCurrentUserCreator && (
          <Link href={`/clouds/edit/${cloudDetails.firebaseKey}`} passHref>
            <Button variant="primary" className="edit">EDIT</Button>
          </Link>
          )}

          {isCurrentUserCreator && (
          <Button variant="danger" onClick={deleteThisCloud} className="m-2"> DELETE </Button>
          )}
        </div>
      </div>
      <div className="comments-section">

        <CommentsSection cloudFirebaseKey={firebaseKey} userUID={user.uid} />
      </div>

    </div>
  );
}
