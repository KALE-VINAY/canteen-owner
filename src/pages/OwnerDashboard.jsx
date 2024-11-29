import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerDashboard = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/shops').then((response) => setShops(response.data));
  }, []);

  const toggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';
    axios.put(`http://localhost:5000/api/shops/${id}`, { status: newStatus }).then(() => {
      setShops((prevShops) =>
        prevShops.map((shop) =>
          shop._id === id ? { ...shop, status: newStatus } : shop
        )
      );
    });
  };

  return (
    <div>
      <h1>Owner Dashboard</h1>
      {shops.map((shop) => (
        <div key={shop._id}>
          <h2>{shop.name}</h2>
          <p>Status: {shop.status}</p>
          <button onClick={() => toggleStatus(shop._id, shop.status)}>
            {shop.status === 'open' ? 'Close Shop' : 'Open Shop'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default OwnerDashboard;
