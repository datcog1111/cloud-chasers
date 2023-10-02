/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
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
      <div className="image-container">
        <img src="https://live-production.wcms.abc-cdn.net.au/d18cf9d4f9ba4983ec312050ce5711bf?impolicy=wcms_crop_resize&cropH=1358&cropW=2043&xPos=5&yPos=87&width=862&height=575" alt="home cloud" style={{ width: '100%', height: 'auto' }} />
        <Link href="/newCloud" passHref>
          <Button variant="outline-dark"> Add A Cloud</Button>
        </Link>
      </div>
      <div className="text-center my-4">
        <ResponsiveMasonry>
          <Masonry
            breakpointCols={3}
            className="masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {clouds.map((cloud) => (
              <CloudPic key={cloud.firebaseKey} cloudObj={cloud} onUpdate={getAllTheClouds} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
}

export default Home;
