import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCloud } from '../../../api/cloudData';
import CloudForm from '../../../components/forms/CloudForm';

export default function EditCloud() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCloud(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<CloudForm obj={editItem} />);
}
