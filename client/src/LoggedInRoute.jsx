import React from 'react'
import { Navigate } from 'react-router-dom';


const LoggedInRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/login" />;
      }
      return children
}

export default LoggedInRoute
