import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const usepetRequest = () => {

    // tan stack query
    const axiosOpen = useAxiosPublic ()
    const {user} = useAuth();


    const { refetch ,data: AdoptRequest = [] } = useQuery({
        queryKey: ['adopt-request'],
        queryFn: async()=>{
            const res = await axiosOpen.get(`/adopt-request?email=${user?.email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })
    return [AdoptRequest, refetch]
};

export default usepetRequest;