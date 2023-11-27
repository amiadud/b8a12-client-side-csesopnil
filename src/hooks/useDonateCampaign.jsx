import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useDonateCampaign = () => {

    // tan stack query
    const axiosOpen = useAxiosPublic ()
    const {user} = useAuth();


    const { refetch ,data: donate_Campaign = [] } = useQuery({
        queryKey: ['adopt-request'],
        queryFn: async()=>{
            const res = await axiosOpen.get(`/donation-campaign?email=${user?.email}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })
    return [donate_Campaign, refetch]
};

export default useDonateCampaign;