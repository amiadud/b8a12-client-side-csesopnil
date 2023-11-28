
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const PetCategory = () => {

    const axiosOpen = useAxiosPublic()

    const {data:result = []} = useQuery({
        queryKey: ['pet-category'],
        queryFn: async() => {
            const res = await axiosOpen('/pet-category')
            return res.data;
        }
    })

    return (
        <div className='grid grid-cols-1 '>
        <div className='my-5'>
            <div className='relative'>
            <h2 className=' text-3xl font-semibold mt-4 dark:bg-slate-800  dark:text-white text-center'>Pet Category </h2>
            </div>
        <div  className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-4 my-4 items-center">   
        {
            result.map(pet => 
                
                <div key={pet?._id} className='border dark:text-white hover:shadow-none  shadow-md rounded-md px-2 py-2'>
                <Link to={`/pet-category/${pet?.pet_name}`}><img className='scale-90 w-full rounded-lg transition-all' src={pet?.pet_image} alt="" /></Link>
                <h2 className=' text-lg text-center capitalize'>{pet?.pet_name}</h2>
                <div className='flex justify-center'><Link to={`/pet-category/${pet?.pet_name}`}>
                 <button className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'>Explore</button>
                 </Link></div>
     </div>   
                )
        }

        </div>
       
        </div>

       
    </div>
    );
};

export default PetCategory;