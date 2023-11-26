import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { Link, useLoaderData } from 'react-router-dom/dist';

const PetDetails = () => {

    const {petName, petLocation, image,petCategory, longDescription, shortDescription, petAge} = useLoaderData();


    return (
        <div className='space-y-6'>
            <div className='text-center text-black w-20 cursor-pointer'>
            <Link to={`/pet-category/${petCategory}`} className='py-2 px-2 bg-gray-400 font-semibold hover:text-white hover:bg-orange-500 t rounded-full'>{petCategory}</Link>
            </div>

            <div className='space-y-2'>
                <h2 className='text-5xl'>{petName}</h2>
                <h2 className='flex items-center gap-1'><FaLocationDot className='text-orange-500' /> {petLocation}</h2>
            </div>
            <h2 className='text-4xl'>Details</h2>
            <div className='md:w-3/5 w-2/4'>
                <img src={image} alt="" />
            </div>
            <div>
            <h2 className='text-left mt-3 dark:text-white'> <span className='font-semibold '>Pet Age:</span> {petAge} Month   </h2>
            </div>
            <div>
                <h2 className='font-semibold'>Short Description</h2>
                {shortDescription}
            </div>
            <div>
                <h2 className='font-semibold'>Long Description</h2>
                {longDescription}
            </div>
        </div>
    );
};

export default PetDetails;