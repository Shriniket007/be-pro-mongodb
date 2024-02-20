// Home.js
import React from 'react';
import ImageSlider from './ImageSlider';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';

const Home = () => {
  return (
    <div className='bg-gray-800' style={{ overflowX: 'hidden' }}>
    {/* <h1>Heelllo</h1> */}
    <ImageSlider />
    <AboutUs />
    {/* <ContactUs /> */}
      
      
      {/* Other content goes here */}
    </div>
  );
};

export default Home;
