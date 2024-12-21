import React, { useState } from 'react';
import apiClient from '../api/apiClient';

const ShopToggle = ({ shopId, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);

  const handleStatusToggle = async () => {
    try {
      const newStatus = status === 'Open' ? 'Closed' : 'Open';
      const response = await apiClient.put(`/shops/${shopId}`, {
        statusshop: newStatus,
      });

      setStatus(newStatus); // Update the UI
      console.log(response.data.message);
    } catch (error) {
      console.error('Error updating status:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <p>Shop Status: {status}</p>
      <button onClick={handleStatusToggle}>
        Toggle to {status === 'Open' ? 'Closed' : 'Open'}
      </button>
    </div>
  );
};

export default ShopToggle;
