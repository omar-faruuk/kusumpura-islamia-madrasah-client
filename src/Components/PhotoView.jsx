import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../Layout/Navbar';
import TopBar from './TopBar';
import TopHeader from './TopHeader';


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
 height: 100%;
 object-fit: cover;
`
const PhotoView = () => {
    const [photos, setPhotos] = useState([])
    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/photos')
            .then(res => setPhotos(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <TopBar />
            <TopHeader />
            <Navbar />
            <div className='container-fluid'>

                <TitleWrapper className='mt-3'>
                    <Title>আমাদের ছবি গ্যালারি</Title>
                </TitleWrapper>
                <div className="row g-2 mt-5">
                    {photos.length ? photos.map(photo => <div key={photo._id} className='col-md-4'>
                        <div className="card h-100">
                            <Image className='img-fluid' src={photo.image} alt="" />

                        </div>

                    </div>) :
                        <div className="d-flex flex-row-reverse align-items-center justify-content-center fs-1 h-100">
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="">Loading...</span>
                        </div>}
                </div>
            </div>
        </>
    );
};

export default PhotoView;