import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserDashboard = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/shops').then((response) => setShops(response.data));
  }, []);

  return (
    <div>
      <h1>Shops</h1>
      {shops.map((shop) => (
        <div key={shop._id}>
          <h2>{shop.name}</h2>
          <p>Status: {shop.status}</p>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
