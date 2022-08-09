import React from 'react';
import Carousel from '../Components/Carousel';
import Footer from '../Components/Footer';
import ImageGallery from '../Components/ImageGallery';
import ImportantLink from '../Components/ImportantLink';
import Newsletter from '../Components/NewsLetter';
import Teacher from '../Components/Teacher';
import Testimonial from '../Components/Testimonial';
import TopBar from '../Components/TopBar';
import TopHeader from '../Components/TopHeader';
import Navbar from '../Layout/Navbar';


const Home = () => {
    return (
        <div>
            <TopBar />
            <TopHeader />
            <Navbar />
            <Carousel />
            <Testimonial />
            <Teacher />
            <Newsletter />
            <ImageGallery />
            <ImportantLink />
            <Footer />

        </div>
    );
};

export default Home;