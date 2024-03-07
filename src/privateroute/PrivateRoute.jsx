import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoutes() {
    const authToken = localStorage.getItem('authToken');

    // Check if the token is expired or user is not an admin, then redirect to login
    if (!authToken) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
