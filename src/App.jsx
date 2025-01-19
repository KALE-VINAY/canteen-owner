// App.jsx
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from './utils/firebase'; // Adjust path as needed
import { onAuthStateChanged } from 'firebase/auth';
import { addUser, removeUser } from './utils/userSlice'; // Adjust path as needed
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
import Login from './pages/Login';
import CanteenList from './components/CanteenList';
import ProtectedRoute from './components/ProtectedRoute';
import CanteenDashboard from './pages/CanteenDashboard';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, update Redux store
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        // User is signed out, clear Redux store
        dispatch(removeUser());
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route 
        path='/home' 
        element={
          <ProtectedRoute>
            <CanteenDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
      <Route
        path="/canteens"
        element={
          <ProtectedRoute>
            <CanteenList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
