import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access-token')}`
    }
})

const useAxiosSecure = () => {

    const navigate = useNavigate()
    const {userLogout} = useAuth();
    axiosSecure.interceptors.request.use((config)=>{
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, (err)=> {
        return Promise.reject(err);
    })

     // intercepts 401 and 403 status
     axiosSecure.interceptors.response.use((response)=>{
        return response
    }, async(err)=> {
        const status = err.response.status
        if (status === 401 || status === 403) {
            await userLogout();
            navigate('/login');
        }
        return Promise.reject(err);
    })

    return axiosSecure;
};

export default useAxiosSecure;