import React, { useEffect, useState } from 'react';
import TopHeader from './TopHeader';
import TopBar from './TopBar';
import Navbar from './../Layout/Navbar';
import ImportantLink from './ImportantLink';
import Footer from './Footer';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';


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
const Container = styled.div`
& p{
    text-align: justify;
    text-justify: inter-word;
}
`
const ShowProject = () => {
    const [text, setText] = useState({})
    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/project')
            .then(res => setText(res.data[0]))
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            <TopBar />
            <TopHeader />
            <Navbar />
            <div className='container'>
                <Container className="container">
                    <TitleWrapper className='mt-3'>
                        <Title>কার্যক্রম</Title>
                    </TitleWrapper>

                    {text ? <ReactMarkdown>{text.text}</ReactMarkdown> :
                        <div class="d-flex flex-row-reverse align-items-center justify-content-center fs-1 h-100">
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            <span className="">Loading...</span>
                        </div>
                    }


                </Container>

            </div>
            <ImportantLink />
            <Footer />
        </>
    );
};

export default ShowProject;