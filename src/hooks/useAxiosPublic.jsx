import axios from 'axios';

const axiosOpen = axios.create({
    baseURL: 'https://pet-adoption-server-rho.vercel.app',
})
const useAxiosPublic = () => {
    return axiosOpen
};

export default useAxiosPublic;