import React from 'react';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth();

    const location = useLocation()

    if (user) {
        return children
    }
    
    else if(loading){
        return <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    }



    return ( 
        toast.warning('Please login first!!'),
        <ToastContainer></ToastContainer>,
    <Navigate state={{from: location}} to="/login" replace></Navigate>
    
    );
};

export default PrivateRoutes;