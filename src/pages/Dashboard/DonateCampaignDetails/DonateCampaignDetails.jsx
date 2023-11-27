import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { loadStripe } from '@stripe/stripe-js';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const DonateCampaignDetails = () => {
    const {user} = useAuth()
    const axiosOpen = useAxiosPublic();

    const { refetch ,data: campaign_details = [] } = useQuery({
      queryKey: ['campaign-details'],
      queryFn: async()=>{
          const res = await axiosOpen.get(`/campaign-details?email=${user?.email}`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('access-token')}`
              }
          })
          return res.data;
      }
  })

    return (
        <div >

            <div className='space-y-4'>
                <h2 className='text-4xl'>{campaign_details?.petName}</h2>
            </div>
            <h2 className='text-4xl my-4'>Details</h2>
            <div className='md:w-3/5  w-2/4 my-4'>
                <img className='rounded' width={200} src={campaign_details?.image} alt="" />
            </div>
            <Link to={'/payment'} className='inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]'>Donate Now</Link>
            <div className='my-4'>
                <h2 className='font-semibold'>Short Description</h2>
              {campaign_details?.shortDescription}
            </div>
            <div>
                <h2 className='font-semibold'>Long Description</h2>
                {campaign_details?.longDescription}
            </div>

        </div>
    );
};

export default DonateCampaignDetails;