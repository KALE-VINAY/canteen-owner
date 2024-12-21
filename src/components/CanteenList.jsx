import React, { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import ShopToggle from './ShopToggle';

const CanteenList = () => {
  const [canteens, setCanteens] = useState([]);

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        const response = await apiClient.get('/shops');
        setCanteens(response.data); // Assuming the backend returns an array of canteens
      } catch (error) {
        console.error('Error fetching canteens:', error.message);
      }
    };

    fetchCanteens();
  }, []);

  return (
    <div>
      <h1>Canteen List</h1>
      {canteens.map((canteen) => (
        <ShopToggle
          key={canteen.id}
          shopId={canteen.id}
          currentStatus={canteen.statusshop}
        />
      ))}
    </div>
  );
};

export default CanteenList;
