import React from 'react';
import Banner from '../../shared/Banner/Banner';
import PetCategory from '../../components/PetCategory/PetCategory';


const Home = () => {
    return (
        <div>
            <Banner/>
            <PetCategory/>
            {/* <AboutUs/> */}
        </div>
    );
};

export default Home;