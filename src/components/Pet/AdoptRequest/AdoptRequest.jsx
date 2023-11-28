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
import usepetRequest from '../../../hooks/usepetRequest';
import { Helmet } from 'react-helmet';
  
  const AdoptRequest = () => {

    const axiosSecure = useAxiosSecure();

       // // make admin

       const handleMakeAccept = (user) => {
        axiosSecure.patch(`/adopt-request/${user._id}`)
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

    const handleReject = (item) =>{
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject it!"
      }).then((result) => {
        if (result.isConfirmed) { 
        axiosSecure.delete(`/adopt-request/${item._id}`)
        .then(res => {
            console.log(res.data);
            if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                    title: "Rejected!",
                    text: "Request Reject and Removed Successful.",
                    icon: "success"
                  });
            }
        })

        }
      });

    }

  const [AdoptRequest, refetch] = usepetRequest()

    return (

        <>
        <Helmet>

        </Helmet>



        <div>
         <TableContainer component={Paper}>
      <Table className='dark:bg-slate-800 dark:text-white' sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell className='border  dark:text-white'>Name </TableCell>
            <TableCell className='border dark:text-white' align="center">Email</TableCell>
            <TableCell className='border dark:text-white' align="center">Phone</TableCell>
            <TableCell className='border dark:text-white' align="center">Location</TableCell>
            <TableCell className='border dark:text-white' align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {AdoptRequest.map((row) => (

            <TableRow
              key={row?._id}
 
            >
              <TableCell className='dark:text-white border-l' component="th" scope="row" width="20%">
                {row.name}
              </TableCell>
             
             <TableCell className='border  dark:text-white' align="left" width="20%" ><span className='text-lg'>{row.email}</span></TableCell>
             <TableCell className='border  dark:text-white' align="left" width="20%" ><span className='text-lg'>{row.phone}</span></TableCell>
             <TableCell className='border dark:text-white ' align="left" width="20%" ><span className='text-lg'>{row.location}</span></TableCell>
              <TableCell className='border dark:text-white' align="center" width="10%">
                {
                  row.status ? "Accepted" : <><div className='flex gap-2 md:flex-row flex-col'><button onClick={()=> handleMakeAccept(row)} className='py-2 px-2 rounded-2xl hover:text-white-600 my-3 hover:bg-gray-500 bg-green-600 text-white hover:cursor-pointer '>Accpet</button> <button onClick={()=> handleReject(row)} className='py-2 px-2 rounded-2xl hover:text-white-600 my-3 hover:bg-gray-500 bg-red-600 text-white hover:cursor-pointer '>Reject</button></div></>
                }

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
      </>
    );
  };
  
  export default AdoptRequest;