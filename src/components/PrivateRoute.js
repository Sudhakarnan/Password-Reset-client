import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, loggedIn }) {
  return loggedIn ? children : <Navigate to="/login" />;
}
