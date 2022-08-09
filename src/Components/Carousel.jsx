import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';


const Container = styled.div`
 @media screen and (min-width: 800px) {
   
    height: 65vh;
    
   margin-bottom: 7rem;
 }
`
const Img = styled.img`
 @media screen and (min-width: 800px) {
    height: 480px;
 }
 
 width: 100%;
 height: 480px;
 object-fit: cover;
`
const Image = styled.img`
 @media screen and (min-width: 800px) {
    height: 480px;
 }
 
 width: 100%;
 /* height: 500px; */
 object-fit: cover;
`
const Div = styled.div`
 width: 100%;
 /* height: 100%; */
 
`

const Carousel = () => {
    const [banner, setBanner] = useState([]);
    const [events, setEvents] = useState([]);
   

    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/banner')
            .then(res => setBanner(res.data))
            .catch(err => console.log(err))


        axios.get('https://secret-badlands-60025.herokuapp.com/events')
            .then(res => setEvents(res.data))
            .catch(err => console.log(err))

    }, [])
    if(events.length){
        const ev = events[0]
       
        console.log(ev.image)
    }
    return (
        <Container className='container mt-3'>
            <div className="row g-md-0 g-2 d-flex flex-md-row flex-column-reverse">
                <div className="col-md-8">
                    {banner.length ? <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            {
                                banner.slice(0, 3).map((b, index) => <Div key={b._id} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                                    <Image src={b.banner} className="Img-fluid" alt="..." />
                                </Div>)
                            }


                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div> :
                        <div class="d-flex flex-row-reverse align-items-center justify-content-center fs-1 h-100">
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="">Loading...</span>
                        </div>

                    }
                </div>
                <div className="col-md-4">
                    {
                        events.length ? <Img  src={events[0].image} className="img-fluid" alt="..." />:
                        <div class="d-flex flex-row-reverse align-items-center justify-content-center fs-1 h-100">
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="">Loading...</span>
                        </div>
                    }
                </div>
            </div>
        </Container>
    );
};

export default Carousel;