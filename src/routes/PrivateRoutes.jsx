import React from 'react';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth();

    const location = useLocation()

    if (user) {
        return children
    }
    
    else if(loading){
        return <span className="loading loading-spinner "></span>
    }



    return ( 
        toast.warning('Please login first!!'),
        <ToastContainer></ToastContainer>,
    <Navigate state={{from: location}} to="/login" replace></Navigate>
    
    );
};

export default PrivateRoutes;