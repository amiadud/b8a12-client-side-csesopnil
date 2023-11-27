import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useCatergory from '../../../hooks/useCatergory';
import { Helmet } from 'react-helmet';

const PetList = () => {

    const axiosOpen = useAxiosPublic();

    const [petData , setpetData ] = useState([])
    
    const [petCate] = useCatergory();


   const { } = useQuery({
    queryKey: ['petlist'],
    queryFn: async()=> {
        const res = await axiosOpen('petlist')
        return setpetData(res.data)
        
    }

   })

    const handleSearch = (item)=> {
        item.preventDefault();
        const form = item.target
        const searchData = form.search.value;
        const category = form.category.value
        const reamings = petData.filter(data => data.petName == searchData &&  data.petCategory == category  )
        setpetData(reamings);
        
    }


    return (
        <div>

            <Helmet>
                <title>All Pet list || Pet Adoption Platform</title>
            </Helmet>

            <form onSubmit={handleSearch} action="">
                <div className='flex justify-center flex-col md:flex-row items-center gap-3'>
                <input name='search' type="text" className='border rounded-md' placeholder='Search....' />
                <select name="category" id="" className='border rounded-md'>
                    {
                        petCate.map(cate => 
                         <option value={cate?.pet_name}>{cate?.pet_name}</option> 
                            )
                    }

                </select>

                <button className='inline-block rounded bg-info px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)]' type="submit">Search</button>
                </div>
            </form>

            <div className='grid grid-cols-2 md:grid-cols-3 mx-2 lg:grid-cols-3 gap-2 my-4 '>
           {
            petData.map(pets => 
                <div data-aos="zoom-in-up" className='border hover:shadow-none shadow-md rounded-md mt-4  '>
                    <div >
                    <Link to={`/pet-details/${pets?._id}`}> <img className='scale-90 h-72 w-full transition-all mt-4' src={pets?.image} alt="" title="" /></Link>
                    <h2 className='  dark:text-white text-center scale-90 text-xl font-semibold'>{pets?.petName}</h2>
                    </div>
                 
                    <div>
                    <h2 className='text-center mt-3 dark:text-white'> <span className='font-semibold '>Pet Age:</span> {pets?.petAge} Month   </h2>
                    <h2 className='text-center mt-3 dark:text-white'> <span className='font-semibold '>Pet Location:</span> {pets?.petLocation}   </h2>
                    </div>
                  
                    <div className='flex justify-center my-2 '>
                    </div>
                     <div className='flex flex-col md:flex-row gap-4  mb-5 mt-2 items-center justify-center'>
                     <Link to={`/pet-details/${pets?._id}`}> <button className='inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]'>Details</button></Link>
                     </div>      
        </div>
                
                )
           }
        </div>
        </div>
    );
};

export default PetList;