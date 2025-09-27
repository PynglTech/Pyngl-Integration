import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute = () => {
    const { userInfo } = useAuthStore();
    return userInfo ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;