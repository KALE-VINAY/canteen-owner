import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig.jsx'; // Import Firebase configuration
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import Mainheader from '../components/Mainheader.jsx';

const CanteenDashboard = () => {
  const [canteens, setCanteens] = useState([]);
  const user = auth.currentUser;
  // const user = useSelector((state) => state.user); // Use Redux state instead of auth.currentUser

  useEffect(() => {
    const fetchCanteens = async () => {
      if (!user) return;
  
      try {
        console.log("Current User ID:", user.uid); // Log the logged-in user's UID
  
        const q = query(collection(db, 'canteens'), where('ownerID', '==', user.uid));
        const querySnapshot = await getDocs(q);
  
        if (querySnapshot.empty) {
          console.log("No canteens found for this user.");
        }
  
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("Fetched Canteens:", data); // Log the fetched canteens
  
        setCanteens(data);
      } catch (error) {
        console.error("Error fetching canteens:", error); // Log any errors during fetching
      }
    };
  
    fetchCanteens();
  }, [user]);
  

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'open' ? 'closed' : 'open';
    const canteenRef = doc(db, 'canteens', id);
    await updateDoc(canteenRef, { status: newStatus });
    setCanteens(prev =>
      prev.map(c => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Please log in to view your canteen details.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Mainheader/>
      <h1 className="text-2xl font-bold text-gray-800 px-2 mb-6">Your Canteens</h1>
      
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {canteens.map(canteen => (
          <div
            key={canteen.id}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{canteen.name}</h2>
            <p className="text-gray-600 mb-4">Status: <span className={`font-bold ${canteen.status === 'open' ? 'text-green-500' : 'text-red-500'}`}>{canteen.status}</span></p>
            <button
              className={`px-4 py-2 rounded-lg text-white font-medium ${
                canteen.status === 'open' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
              }`}
              onClick={() => toggleStatus(canteen.id, canteen.status)}
            >
              {canteen.status === 'open' ? 'Close Canteen' : 'Open Canteen'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanteenDashboard;
