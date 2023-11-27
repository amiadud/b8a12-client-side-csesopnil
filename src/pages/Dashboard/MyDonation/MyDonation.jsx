import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyDonation = () => {

    const axiosSecure = useAxiosSecure();

    const {user} = useAuth();

    const { refetch ,data: payments_details = [] } = useQuery({
        queryKey: ['payments'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments?email=${user?.email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })

    console.log(payments_details);

    const handleDeleteDonate = (item) =>{
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
          axiosSecure.delete(`/payments/${item._id}`)
          .then(res => {
              console.log(res.data);
              if (res.data.deletedCount > 0) {
                  refetch();
                  Swal.fire({
                      title: "Deleted!",
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
            
            <TableCell className='border' >Pet Image </TableCell>
            <TableCell className='border' align="center">PetName</TableCell>
            <TableCell className='border' align="center">Donated Amount</TableCell>
            <TableCell className='border' align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {payments_details.map((row) => (

            <TableRow
              key={row?._id}
            >
              <TableCell component="th" scope="row" width="20%">
                <img className="rounded-md w-24 object-cover" src={row?.petImage} alt="" />
              </TableCell>
             
              <TableCell className='border  ' align="left" width="20%" ><span className='text-lg'>{row.petName}</span></TableCell>
             <TableCell className='border  ' align="left" width="20%" ><span className='text-lg'>${row.donateAmount}</span></TableCell>
             <TableCell component="th" scope="row" width="5%">
             <button onClick={()=> handleDeleteDonate(row)} className='py-2 px-2 rounded-2xl hover:text-white-600 my-3 hover:bg-gray-500 bg-green-600 text-white hover:cursor-pointer '>Refund</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    );
};

export default MyDonation;