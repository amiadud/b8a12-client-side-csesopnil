import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';
import AOS from 'aos'; 
import 'aos/dist/aos.css';

const MainLayout = () => {

    useEffect(() => {
        AOS.init();
      }, [])

    return (
        <div className='max-w-7xl mx-auto '>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;