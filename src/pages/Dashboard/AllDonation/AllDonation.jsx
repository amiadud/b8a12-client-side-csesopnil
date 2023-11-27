import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';
import ProgressBar from "@ramonak/react-progress-bar";
import useDonateCampaign from '../../../hooks/useDonate';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
  
  const AllDonation = () => {

    const axiosSecure = useAxiosSecure()
    const axiosOpen = useAxiosPublic()

    const [collectid, setcollectid] = useState('')
    console.log(collectid);
    

    const {data: All_donate_Campaign = [], refetch } = useQuery({
        queryKey: ['adopt-request'],
        queryFn: async()=>{
            const res = await axiosOpen.get(`/all-donation-campaign`)
            return res.data;
        }
    })
    console.log(All_donate_Campaign);

      
    const handlePauseDonation = (donation) => {
      axiosSecure.patch(`/donation-pause/${donation}`)
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

    const handleDelete = (item) =>{
      console.log(item._id);
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
        axiosSecure.delete(`/all-donation-campaign/${item._id}`)
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

        <>
        <Helmet>

        </Helmet>



        <div>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            <TableCell className='border'>Pet Name </TableCell>
            <TableCell className='border' align="center">Maximum Donation Amount</TableCell>
            <TableCell className='border' align="center">Donation Progress</TableCell>
            <TableCell className='border' align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {All_donate_Campaign.map((row) => (

            <TableRow
              key={row?._id}
            >
              <TableCell component="th" scope="row" width="20%">
                {row.petName}
              </TableCell>
             
             <TableCell className='border  ' align="left" width="20%" ><span className='text-lg'>${row.maxDonation}</span></TableCell>
             <TableCell className='border  ' align="left" width="20%" >
             <ProgressBar completed={row.DonateAmount} maxCompleted={row.maxDonation} />
              </TableCell>
              <TableCell className='border' align="center" width="10%">
              <div className='flex gap-2'>
              <button onClick={()=> handlePauseDonation(row._id)} className='py-2 px-2 rounded-2xl hover:text-white-600 my-3 hover:bg-gray-500 bg-green-600 text-white hover:cursor-pointer '>{row.role =='pause' ? 'Pause ' : 'Make Pause'}</button>
              <Link className='py-2 px-2 rounded-2xl hover:text-white-600 my-3 hover:bg-gray-500 bg-blue-600 text-white hover:cursor-pointer' to={`/dashboard/update-donation-campaign/${row?._id}`}>Edit</Link>
              <button onClick={() => handleDelete(row) } className='py-2 px-2 rounded-2xl hover:text-white-600 my-3 hover:bg-gray-500 bg-red-600 text-white hover:cursor-pointer '>Delete</button>
              </div>

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
  
  export default AllDonation;