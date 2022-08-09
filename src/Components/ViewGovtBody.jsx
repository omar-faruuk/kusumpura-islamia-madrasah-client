import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Navbar from '../Layout/Navbar';
import Footer from './Footer';
import ImportantLink from './ImportantLink';
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
const Ol = styled.ol`
& li{
    margin-bottom: 8px;
    border-bottom: 1px solid gray;
    padding: 10px 0;
    display: flex;
    
}
`
const ViewGovtBody = () => {
    const [govtBody, setGovtBody] = useState([])
    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/govtBody')
            .then(res => setGovtBody(res.data))
            .catch(err => console.log(err))
    }, [])
    return (
        <>
            <TopBar />
            <TopHeader />
            <Navbar />
            <div className="container">
                <TitleWrapper className='mt-3'>
                    <Title className='mt-3'>গভর্নিং বডি</Title>
                </TitleWrapper>
                <div className="row">
                    <div className="col-md-5 border">
                        {govtBody.length ? <Ol className=''>
                            {
                                govtBody.map(g => <li key={g._id}><span className='d-flex'>{g.name}-{g.position}</span></li>)
                            }
                        </Ol> :
                            <div className="d-flex flex-row-reverse align-items-center justify-content-center fs-1 h-100">
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                <span className="">Loading...</span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <ImportantLink />
            <Footer />
        </>
    );
};

export default ViewGovtBody;