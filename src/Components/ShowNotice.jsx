import React, { useContext } from 'react';
import styled from 'styled-components';

import { userContex } from './../App';
import TopHeader from './TopHeader';
import Navbar from '../Layout/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Image = styled.img`
/* width: 100%;
height: 100%;
object-fit: cover; */
`
const ShowNotice = () => {
    const { not } = useContext(userContex)
    const [notice, setNotice] = not;
    const { title, date, pdf } = notice;
    return (
        <>
            <div className="container">
                <TopHeader />
                <Navbar />
                <div className="row mt-5">
                    <h3>{title}</h3>
                    <span><FontAwesomeIcon className='mx-1' icon={faCalendarAlt} /> {date}</span>
                    <div className="col-md-12">
                        <Image className='img-fluid' src={pdf} alt='' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShowNotice;