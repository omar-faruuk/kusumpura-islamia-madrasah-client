import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
const Span = styled.span`
 @media screen and (max-width:568px) {
    font-size: 12px;
 }
`
const Footer = () => {
    return (
        <div className="container-fluid bg-dark text-white p-2">
            <div className="d-flex justify-content-around">
                <div className="">
                    <Span>&copy; 2022. All rights reserved.</Span>
                </div>
                <div className="d-flex align-items-center">
                    <Span className='me-2'>Developed by <a href="https://www.facebook.com/mohammad.omarfaruq.315">Omar faruq</a></Span>
                    <a target="_blank" href='https://www.facebook.com/mohammad.omarfaruq.315'><FontAwesomeIcon icon={faFacebook} /></a>
                </div>
            </div>
        </div>
    );
};

export default Footer;