import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useallpet = () => {

    // tan stack query
    const axiosOpen = useAxiosPublic ()


    const { refetch ,data: allpetdata = [] } = useQuery({
        queryKey: ['petlist'],
        queryFn: async()=>{
            const res = await axiosOpen.get(`/petlist`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })
    return [allpetdata, refetch]
};

export default useallpet;