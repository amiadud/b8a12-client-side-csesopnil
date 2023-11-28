import React, { useEffect, useState } from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { Link, useLoaderData, useNavigate } from 'react-router-dom/dist';
import useAuth from '../../../hooks/useAuth';
import {
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter,
  } from "tw-elements-react";
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const PetDetails = () => {

  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const {user} = useAuth()

    const axiosSecure = useAxiosSecure();

    const {petName, petLocation, image,petCategory, longDescription, shortDescription, petAge} = useLoaderData();

    const handleMakeAdopt = (event) => {
        event.preventDefault();
        const name = user?.displayName
        const email = user?.email
        const form = event.target
        const location = form.location.value
        const phone = form.phoneNumber.value
        const adoptData = {name, email, location, phone}
        console.log(adoptData);

        axiosSecure.post('/adopt-request', adoptData)
        .then(res => {
            
            console.log(res.data);
           if(res.data.insertedId){
            Swal.fire({
              icon: "success",
              title: "Your Request has been saved",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/dashboard/adopt-request/')
           }
        })

        closeModal()
    }

    const closeModal = () => {
        setShowModal(false);
      };

      useEffect(() => {
        // Fetch initial set of pets when the component mounts
        fetchPets();
      }, []);

      useEffect(() => {
        // Attach the scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);
    
        // Remove the event listener when the component is unmounted
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      const fetchPets = async () => {
        // Simulate fetching data from an API
        const response = await fetch(`https://pet-adoption-server-rho.vercel.app/petitems?page=${page}`);
        const newPets = await response.json();
    
        // Update the state with the new pets
        setPets((prevPets) => [...prevPets, ...newPets]);
    
        // Increment the page for the next fetch
        setPage((prevPage) => prevPage + 1);
      };

      const handleScroll = () => {
        // Check if the user has reached the bottom of the page
        if (
          window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 500
        ) {
          // Fetch more pets when the user is near the bottom
          fetchPets();
        }
      };

      console.log(pets);



    return (
        <div >
            <div className='text-center text-black w-20 cursor-pointer my-5 '>
            <Link to={`/pet-category/${petCategory}`} className='inline-block rounded-full border-2 dark:text-white border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out dark:border-white hover:border-success-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-success-600 focus:border-success-600 focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10'>{petCategory}</Link>
            </div>

            <div className='space-y-4'>
                <h2 className='text-4xl dark:text-white'>{petName}</h2>
                <h2 className='flex items-center gap-1 dark:text-white'><FaLocationDot className='text-orange-500 dark:text-cyan-400' /> {petLocation}</h2>
            </div>
            <h2 className='text-4xl my-4 dark:text-white'>Details</h2>
            <div className='md:w-3/5  w-2/4 my-4'>
                <img className='rounded' src={image} alt="" />
            </div>
            <button onClick={ user ? () => setShowModal(true) : () => setShowModal(false) } className='inline-block rounded dark:bg-green-500 bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]'>Adopt</button>
            <div className='my-4'>
            <h2 className='text-left mt-3 dark:text-white'> <span className='font-semibold '>Pet Age:</span> {petAge} Month   </h2>
            </div>
            <div className='my-4'>
                <h2 className='font-semibold dark:text-white my-3 text-2xl'>Short Description</h2>
                <span className='dark:text-white '>{shortDescription}</span>
            </div>
            <div>
                <h2 className='font-semibold my-3 dark:text-white text-2xl'>Long Description</h2>
                <span className='dark:text-white '>{longDescription}</span>
            </div>
{/* <!-- Modal --> */}
<TEModal show={showModal} setShow={setShowModal} staticBackdrop>
        <TEModalDialog>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
              Adoption Request Form
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
              <span className="label-text dark:text-white">Name:</span>
            </label>
            <input
              type="text"
              class="peer block  min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              
              defaultValue={user?.displayName}
              placeholder="Email address" readOnly/>
          </div>
          <div class="relative mb-6" data-te-input-wrapper-init>
          <label className="label">
              <span className="label-text dark:text-white">Email:</span>
            </label>
            <input
              type="text"
              class="peer block  min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 "
              defaultValue={user?.email}
              placeholder="Email address"  readOnly/>
          </div>
            <form onSubmit={handleMakeAdopt } action="">
          <div class="relative mb-6" data-te-input-wrapper-init>
          <label className="label">
              <span className="label-text dark:text-white">Phone Number:</span>
            </label>
            <input 
              type="text"
              name='phoneNumber'
              class=" min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 "
              placeholder="Enter Phone Number..." />
          </div>
          <div class="relative mb-6" data-te-input-wrapper-init>
          <label className="label">
              <span className="label-text dark:text-white">Address:</span>
            </label>
            <input
              type="text"
              name='location'
              class="peer block  min-h-[auto] w-full rounded border-1 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 "
              placeholder="Enter Address..." />
          </div>
          <div className='flex justify-end'>
          <button
                  type="submit"
                  className=" mt-4 dark:text-white dark:hover:bg-slate-100 dark:border dark:hover:text-black rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Request
                </button>
          </div>
            </form>
            </TEModalBody>
            <TEModalFooter>
              <TERipple rippleColor="light">
                <button
                  type="button"
                  className="inline-block dark:hover:bg-slate-100 dark:border dark:hover:text-black dark:text-black  rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </TERipple>
              
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>

      <h1 className='text-5xl font-semibold my-8 dark:text-white'>More Pets</h1>
      <ul>
      <div className='grid grid-cols-2 md:grid-cols-3 mx-2 lg:grid-cols-3 gap-2 my-4 '>
            {
                pets.map( pets => 
                    
                    <div data-aos="zoom-in-up" className='border hover:shadow-none shadow-md rounded-md mt-4  '>
                    <div >
                    <Link to={`/pet-details/${pets?._id}/`}> <img className='scale-90 h-72 w-full transition-all mt-4' src={pets?.image} alt="" title="" /></Link>
                    <h2 className='  dark:text-white text-center scale-90 text-xl font-semibold'>{pets?.petName}</h2>
                    </div>
                 
                    <div>
                    <h2 className='text-center mt-3 dark:text-white'> <span className='font-semibold '>Pet Age:</span> {pets?.petAge} Month   </h2>
                    <h2 className='text-center mt-3 dark:text-white'> <span className='font-semibold '>Pet Location:</span> {pets?.petLocation}   </h2>
                    </div>
                  
                    <div className='flex justify-center my-2 '>
                    </div>
                     <div className='flex flex-col md:flex-row gap-4  mb-5 mt-2 items-center justify-center'>
                     <Link to={`/pet-details/${pets?._id}/`}> <button className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'>Details</button></Link>
                     </div>
  </div>     
                    )
            }
                   
        </div>
      </ul>
        </div>
    );
};

export default PetDetails;