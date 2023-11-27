import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useCatergory = () => {

    
    const axiosOpen = useAxiosPublic()

    const {data: petCate=[],  refetch} = useQuery({
        queryKey: ['pet-category'],
        queryFn: async()=> {
            const res = await axiosOpen.get('/pet-category')
            return res.data
        }
    })

    return [petCate, refetch];
};

export default useCatergory;