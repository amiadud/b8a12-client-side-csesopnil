import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const usePet = () => {

    // tan stack query
    const axiosOpen = useAxiosPublic ()
    
    const {user} = useAuth();

    const { refetch ,data: petData = [] } = useQuery({
        queryKey: ['petitem'],
        queryFn: async()=>{
            const res = await axiosOpen.get(`/petitem?email=${user.email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })
    return [petData, refetch]
};

export default usePet;