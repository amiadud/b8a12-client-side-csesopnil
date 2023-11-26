import React from 'react';
import Banner from '../../shared/Banner/Banner';
import PetCategory from '../../components/PetCategory/PetCategory';
import Banner2 from '../../shared/Banner2/Banner2';
import AboutUs from '../../shared/Aboutus/AboutUs';

const Home = () => {
    return (
        <div>
            <Banner/>
            <PetCategory/>
            <Banner2/>
            <AboutUs/>
        </div>
    );
};

export default Home;