import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { userContex } from './../App';


const PrivateRoute = ({ children }) => {
    const { login } = useContext(userContex);
    const [logedInUser] = login
    const location = useLocation()

    // const auth2 = logedInUser.name || logedInUser.email || sessionStorage.getItem('token'); 
    const auth2 = true
    return auth2 ? children :
        <Navigate to={'/login'} state={{ from: location }} replace />
};

export default PrivateRoute;