import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import toast, { Toaster } from 'react-hot-toast';
import Signup from './pages/signUp/Signup';
import Login from './pages/logIn/Login';
import Home from './pages/home/Home';
import Theme from './pages/theme/Theme';
import Response from './pages/response/Response';
import Dashboard from './pages/dashboard/Dashboard';
import Settings from './pages/settings/Settings';
import FormPage from './pages/form/FormPage';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('User logged out successfully');
  };

  return (
    <>
      <BrowserRouter>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/form" element={<FormPage />} /> 
          <Route path="/theme" element={<Theme />} /> 
          <Route path="/response" element={<Response />} />
          <Route path="/settings" element={<Settings handleLogout={handleLogout} />} />
          <Route path="/dashboard/:userId"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard handleLogout={handleLogout} />
            </ProtectedRoute>}/>
        </Routes>
      </BrowserRouter> 
      <Toaster />
    </>
  )
}

export default App
