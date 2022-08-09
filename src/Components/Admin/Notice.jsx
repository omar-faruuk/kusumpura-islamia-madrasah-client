import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilePdf, faCalendar, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { userContex } from './../../App';
import { Link } from 'react-router-dom';
import TopHeader from './../TopHeader';
import Navbar from './../../Layout/Navbar';

const TitleWrapper = styled.div`
 margin-bottom: 35px;
 margin-top: 1.5rem;
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
const Li = styled.li`

margin-bottom: 5px;
& a{
    cursor: pointer;
}

`
const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`

const Notice = () => {
    const [allNotice, setAllNotice] = useState([])
    const { not } = useContext(userContex);
    const [notice, setNotice] = not;

    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/notice')
            .then(res => setAllNotice(res.data))
            .catch(err => console.log(err))
    }, [])



    return (
        <>
            <TopHeader />
            <Navbar />
            <div className="container">
                <TitleWrapper>
                    <Title>নোটিস</Title>
                </TitleWrapper>
                <div className="row">
                    <div className="col-md-6">

                        <ul>
                            {allNotice.length ?
                                allNotice.slice(0).reverse().map(data =>
                                    <Li key={data._id} className=''>
                                        <Link to="/showNotice" onClick={() => setNotice(data)} className=''><h3>{data.title}</h3></Link>
                                        <p><FontAwesomeIcon className='mx-1' icon={faCalendarAlt} />{data.date}</p>

                                    </Li>) :
                                <div className="d-flex flex-row-reverse align-items-center justify-content-center fs-1 h-100">
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="">Loading...</span>
                                </div>
                            }
                        </ul>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Notice;