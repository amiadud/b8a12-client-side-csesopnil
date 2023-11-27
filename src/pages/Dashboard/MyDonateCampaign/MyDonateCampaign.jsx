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
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';
import ProgressBar from "@ramonak/react-progress-bar";
import useDonateCampaign from '../../../hooks/useDonate';
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import useAuth from '../../../hooks/useAuth';
  
  const MyDonateCampaign = () => {

    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()
    const [showModal, setShowModal] = useState(false);

    const [collectid, setcollectid] = useState('')
    console.log(collectid);
    
    const [donate_Campaign, refetch] = useDonateCampaign()
    console.log(donate_Campaign);

      
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

    const handleDonateHere = (event) => {
      event.preventDefault();
      closeModal()
  }

  const closeModal = () => {
      setShowModal(false);
    };




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
          {donate_Campaign.map((row) => (

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
              <button onClick={()=> handlePauseDonation(row._id)} className='py-2 px-2 rounded-2xl hover:text-white-600 my-3 hover:bg-gray-500 bg-green-600 text-white hover:cursor-pointer '>{row.role =='pause' ? 'Pause ' : 'Make Pause'}</button>
              <Link className='py-2 px-2 rounded-2xl hover:text-white-600 my-3 hover:bg-gray-500 bg-blue-600 text-white hover:cursor-pointer' to={`/dashboard/update-donation-campaign/${row?._id}`}>Edit</Link>
              <button onClick={() => setShowModal(true) } onBlur={()=> setcollectid(row._id)} className='py-2 px-2 rounded-2xl hover:text-white-600 my-3 hover:bg-gray-500 bg-green-600 text-white hover:cursor-pointer '>Donators</button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

{/* <!-- Modal --> */}
<TEModal show={showModal} setShow={setShowModal} staticBackdrop>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              Donators for {user?.displayName}
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className=" rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}
            <TEModalBody>
            <div class="relative mb-6" data-te-input-wrapper-init>
          <label className="label">
              <span className="label-text dark:text-white">User Name:</span>
            </label>
            <input
              type="text"
              class="peer block  min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              
              defaultValue={user?.displayName}
              placeholder="Email address" readOnly/>
          </div>

            <form onSubmit={handleDonateHere} action="">
          <div class="relative mb-6" data-te-input-wrapper-init>
          <label className="label">
              <span className="label-text dark:text-white">Donate Amount:</span>
            </label>
            <input 
              type="text"
              name='donateAmount'
              class=" min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 "
              placeholder="Enter Amount Number..." readOnly/>
          </div>
          <div className='flex justify-end'>
          <button
                  type="submit"
                  className=" mt-4 dark:hover:bg-slate-100 dark:border dark:hover:text-black rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Added
                </button>
          </div>
            </form>
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block dark:hover:bg-slate-100 dark:border dark:hover:text-black dark:text-white  rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </TERipple>
              
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>

        </div>
      </>
    );
  };
  
  export default MyDonateCampaign;