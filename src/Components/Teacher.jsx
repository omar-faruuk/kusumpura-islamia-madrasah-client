import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Virtual, Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'

import TeacherCard from './TeacherCard';

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
    width: 400px;
    
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


const Teacher = () => {
    const [teachers, setTeachers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/teachers')
            .then(res => {
                setTeachers(res.data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <section className="pt-md-5 pt-0" id='service'>
            <div className="container text-center">
                <TitleWrapper>
                    <Title>আমাদের শিক্ষক-শিক্ষিকা বৃন্দ</Title>
                </TitleWrapper>
                <div className="mt-5">

                    <Swiper
                        modules={[Navigation, Autoplay, Virtual, Pagination]}
                        navigation
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

                        className="mySwiper"
                    >

                        {
                            teachers.map(teacher => <SwiperSlide key={teacher._id}>
                                <TeacherCard teacher={teacher}></TeacherCard>
                            </SwiperSlide>
                            )

                        }

                    </Swiper>
                </div>

            </div>

        </section >
    );
};

export default Teacher;