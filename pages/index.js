/* eslint-disable @next/next/no-img-element */
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
    <div className="container">
      <div className="home-image">
        <img src="https://i.pinimg.com/564x/8b/b9/aa/8bb9aae8a3ef9f680c6e862e90eca047.jpg" alt="home cloud" style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className="text-center my-4">
        <Link href="/newCloud" passHref>
          <Button> Add A Cloud</Button>
        </Link>
        <div className="d-flex flex-wrap" id="homepage">
          {clouds.map((cloud) => (
            <CloudPic key={cloud.firebaseKey} cloudObj={cloud} onUpdate={getAllTheClouds} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
