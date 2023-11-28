import React from 'react';
import Banner from '../../shared/Banner/Banner';
import PetCategory from '../../components/PetCategory/PetCategory';
import AboutUs from '../../shared/Aboutus/AboutUs';
import Banner2 from '../../shared/Banner2/Banner2';
import ContactUs from '../../shared/ContactUs/ContactUs';
import HomePet from '../../shared/HomePet/HomePet';
import { Helmet } from 'react-helmet';


const Home = () => {
    return (
        <div>
            <Helmet>
                <title>
                    Pet Adoption Website
                </title>
            </Helmet>
            <Banner/>
            <PetCategory/>
            <Banner2/>
            <HomePet/>
            <AboutUs/>
            <ContactUs/>

        </div>
    );
};

export default Home;