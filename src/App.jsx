import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks.jsx';
import ShowBook from './pages/ShowBook.jsx';
import EditBook from './pages/EditBook.jsx';
import DeleteBook from './pages/DeleteBook.jsx';
import Login from './pages/Login';
import CanteenList from './components/CanteenList.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CanteenDashboard from './pages/CanteenDashboard';
const App = () => {
  return (
  <Routes>
    <Route path='/' element={<Login/>} />
    <Route path='/home' element={<CanteenDashboard />} />
    <Route path='/books/create' element={<CreateBook/>} />
    <Route path='/books/details/:id' element={<ShowBook/>} />
    <Route path='/books/edit/:id' element={<EditBook/>} />
    <Route path='/books/delete/:id' element={<DeleteBook/>} />
    <Route
          path="/canteens"
          element={
            <ProtectedRoute>
              <CanteenList />
            </ProtectedRoute>
          }
        />
  </Routes> 
 )
}

export default App
