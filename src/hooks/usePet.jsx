import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const usePet = () => {

    // tan stack query
    const axiosSecure = useAxiosSecure ()
    
    const {user} = useAuth();

    const { refetch ,data: petData = [] } = useQuery({
        queryKey: ['petitem'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/petitem?email=${user.email}`, {
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