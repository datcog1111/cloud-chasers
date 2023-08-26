import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getClouds } from '../api/cloudData';
import CloudPic from '../components/cloudCard';

function Home() {
  const [clouds, setClouds] = useState([]);

  const getAllTheClouds = () => {
    getClouds().then(setClouds);
  };
  useEffect(() => {
    getAllTheClouds();
  }, []);

  return (
    <div className="text-center my-4">
      <Link href="/newCloud" passHref>
        <Button> Add A Cloud</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {clouds.map((cloud) => (
          <CloudPic key={cloud.firebaseKey} cloudObj={cloud} onUpdate={getAllTheClouds} />
        ))}
      </div>
    </div>
  );
}

export default Home;
