import axios from 'axios';

const axiosOpen = axios.create({
    baseURL: 'http://localhost:5000',
})
const useAxiosPublic = () => {
    return axiosOpen
};

export default useAxiosPublic;