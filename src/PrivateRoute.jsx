import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);

    // Check if user is authenticated or if there's a user object
    return (isAuthenticated || user) ? <Outlet /> : <Navigate to="/login" />;
};
export default PrivateRoute