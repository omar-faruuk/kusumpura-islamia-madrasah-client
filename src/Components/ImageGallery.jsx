import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { EffectFlip, Pagination, Navigation, Autoplay, Virtual, } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
import 'swiper/swiper.min.css';

import 'swiper/modules/pagination/pagination.min.css'
import axios from 'axios';
import { userContex } from './../App';
import { Link } from 'react-router-dom';




const TitleWrapper = styled.div`
 margin-bottom: 35px;
 position: relative;
 &:before{
    background: #1bb4b9 none repeat scroll 0 0;
    bottom: 0;
    content: "";
    height: 2px;
    left: 0;
    margin: -14px auto;
    position: absolute;
    right: 0;
    text-align: center;
    width: 200px;
    
 };
 &::after{
    background: #ffffff none repeat scroll 0 0;
    bottom: -6px;
    color: #1bb4b9;
    content: "";
    font-family: fontawesome;
    font-size: 18px;
    height: 17px;
    left: 0;
    margin: -10px auto;
    position: absolute;
    right: 0;
    text-align: center;
    width: 39px;
    z-index: 9;
 }
`
const Title = styled.h2`
text-align: center;
overflow: hidden;
position: relative;

`
const Image = styled.img`
 width: 100%;
 height: 360px;
 object-fit: cover;
 
`
const Container = styled.div`
margin-top: 1rem;
padding: 1rem 0;
`
const ImageGallery = () => {

    const [photos, setPhotos] = useState([])
    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/photos')
            .then(res => setPhotos(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <Container className="conatainer-fluid bg-light mb-5">
            <TitleWrapper>
                <Title>ছবি গ্যালারি</Title>
            </TitleWrapper>
            <div className="mt-5 mb-5">
                {photos.length ? <Swiper
                    modules={[Navigation, EffectFlip, Autoplay, Virtual, Pagination]}

                    autoplay={{ delay: 2000, }}
                    pagination={{ clickable: true }}
                    loop={true}
                    // autoplayDisableOnInteraction ={true}
                    slidesPerView={3}
                    onSwiper={(swiper) => { }}

                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 2,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {
                        photos.map(photo => <SwiperSlide className='' key={photo._id}>
                            <Image className='img-fluid' src={photo.image} />
                        </SwiperSlide>)
                    }

                </Swiper> :
                    <div className="d-flex flex-row-reverse align-items-center justify-content-center fs-1 h-100">
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="">Loading...</span>
                    </div>
                }
            </div>

            <div className='d-flex flex-md-row flex-column justify-content-center'>
                <h3 className='mx-3 text-center'>আমাদের ফটো <b>গ্যালারি দেখুন</b></h3>
                <div className='text-center mt-1'><Link to="/PhotoGallery" className="btn-success flex-1  p-2 border-0 rounded-pill">See Gallery</Link></div>
            </div>

        </Container>
    );
};

export default ImageGallery;