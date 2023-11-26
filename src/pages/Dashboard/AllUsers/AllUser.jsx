import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useUser from '../../../hooks/useUser';
import { FaUsers } from "react-icons/fa";
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const AllUser = () => {

    const [users, refetch]= useUser();
    const axiosSecure = useAxiosSecure();

    function createData(name, email, role, action) {
      return { name, email, role, action };
    }
    

    // // make admin

    const handleMakeAdmin = (user) => {
      axiosSecure.patch(`users/admin/${user._id}`)
      .then(res => {
        console.log(res.data);
        if(res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "Good job!",
            icon: "success"
          });
        }
      })
   
    }

    // delete users

    const handleDeleteUser = (user) => {

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
        
        axiosSecure.delete(`/users/${user._id}`)
        .then(res => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                    title: "Deleted!",
                    text: "Your Cart has been deleted.",
                    icon: "success"
                  });
            }
        })

        }
      });
      

    }    

    

    return (
        <div>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className='border'>Name </TableCell>
            <TableCell className='border' align="center">Email</TableCell>
            <TableCell className='border' align="center">Role</TableCell>
            <TableCell className='border' align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {users.map((row) => (
            <TableRow
              key={row?._id}
 
            >
              <TableCell component="th" scope="row" width="20%">
                {row.name}
              </TableCell>
             <TableCell className='border  ' align="left" width="20%" ><span className='text-lg'>{row.email}</span></TableCell>
              <TableCell className='border' align="center" width="10%">
                {
                  row.role ? "Admin" : <><button onClick={()=> handleMakeAdmin(row)} className='py-2 px-2 rounded-2xl hover:text-blue-600 btn my-3  bg-orange-600 text-white hover:cursor-pointer '><FaUsers className='text-2xl'/></button></>
                }

              </TableCell>
              <TableCell className='border' align="center" width="10%"><button onClick={()=> handleDeleteUser(row)}><MdDeleteForever className='text-3xl text-red-600' /></button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
};

export default AllUser;