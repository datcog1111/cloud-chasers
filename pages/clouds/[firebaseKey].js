/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import Head from 'next/head';
import { getSingleCloud } from '../../api/cloudData';

export default function ViewCloud() {
  const [cloudDetails, setCloudDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCloud(firebaseKey).then(setCloudDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      {cloudDetails.image && (
      <div className="d-flex flex-column">
        <img src={cloudDetails.image} alt={cloudDetails.description} style={{ width: '400px' }} />
      </div>
      )}
      <div className="text-black ms-5 details">
        <h5>
          {cloudDetails.type}
        </h5>
        <p>{cloudDetails.description}</p>
        <h3>{cloudDetails.location}</h3>
        <h6>{cloudDetails.added_on}</h6>
      </div>
    </div>
  );
}
