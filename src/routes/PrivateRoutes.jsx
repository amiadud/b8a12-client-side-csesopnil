import React from 'react';
import useAuth from '../hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Swal from 'sweetalert2';

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
        Swal.fire({
            icon: "warning",
            title: "Please Login First!!",
          }),
    <Navigate state={{from: location}} to="/login" replace></Navigate>
    
    );
};

export default PrivateRoutes;