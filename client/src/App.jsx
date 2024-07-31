import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Signup from './pages/signUp/Signup';
import Login from './pages/logIn/Login';
import Home from './pages/home/Home';
import Theme from './pages/theme/Theme';
import Response from './pages/response/Response';
import Dashboard from './pages/dashboard/Dashboard';
import Settings from './pages/settings/Settings';
import FormPage from './pages/form/FormPage';
import FormResponse from './pages/formResponse/FormResponse';
import NotFound from './pages/notfound/NotFound';
import LoggedInRoute from './LoggedInRoute';

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

          <Route path="/login" element={<Login handleLogin={handleLogin} />} />

          <Route path="/register" element={<Signup />} />

          <Route path="/form/:userId/:formId" element={<FormPage />} />

          <Route path="/theme/:userId/:formId" element={<Theme />} />

          <Route path="/theme/:userId/:folderId/:formId" element={<Theme />} />

          <Route path="/response/:userId/:formId" element={<Response />} />

          <Route path="/response/:userId/:folderId/:formId" element={<Response />} />
          
          <Route path="/settings" element={<Settings handleLogout={handleLogout} />} />
          <Route path="/dashboard/:userId"
          element={<LoggedInRoute isLoggedIn={isLoggedIn}><Dashboard handleLogout={handleLogout} /></LoggedInRoute>}/>

          <Route path="/dashboard/:userId/newform"
          element={<LoggedInRoute isLoggedIn={isLoggedIn}><FormPage isNewForm={true} /></LoggedInRoute>}/> 

          <Route path="/dashboard/:userId/:folderId/newform"
          element={<LoggedInRoute isLoggedIn={isLoggedIn}><FormPage isNewForm={true} /></LoggedInRoute>}/>

          <Route path="/dashboard/:userId/:formId"
          element={<LoggedInRoute isLoggedIn={isLoggedIn}><FormPage isNewForm={false} /></LoggedInRoute>}/>

        <Route path="/form/:uniqueUrl" element={<FormResponse/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </BrowserRouter> 
      <Toaster />
    </>
  )
}

export default App
