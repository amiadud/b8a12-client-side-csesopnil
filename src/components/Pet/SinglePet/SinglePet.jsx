import axios from 'axios';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLoaderData, useParams } from 'react-router-dom';

const SinglePet = () => {

    const cname = useParams()
    console.log(cname);

    const data = useLoaderData()
    console.log(data);


    return (
        <>
        <Helmet>
            <title> {cname.cname} List | Pet Adoption </title>
        </Helmet>
        <div>
                <h2 className='text-3xl dark:text-white capitalize text-center my-3'> All {cname.cname} <span></span> </h2>
                <hr />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 mx-2 lg:grid-cols-3 gap-2 my-4 '>
            {
                data.map( pets => 
                    
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
        </>
    );
};

export default SinglePet;