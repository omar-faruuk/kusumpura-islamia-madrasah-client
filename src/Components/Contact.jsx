import React from 'react';
import { faFacebook, faInstagram, } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faLocation, faMessage, faPhone } from '@fortawesome/free-solid-svg-icons';
import TopHeader from './TopHeader';
import Navbar from '../Layout/Navbar';
import ImportantLink from './ImportantLink';
import Footer from './Footer';

const Div = styled.div`
  & li{
    list-style-type: none;
    margin-bottom: 8px;
  }
`
const Icon = styled.span`
 margin-left: 16px;
`

const Contact = () => {
    return (
        <>
            <TopHeader />
            <Navbar />
            <div className="container">
                <div className="row">
                    <Div className="">
                        <h4 className='p-2'>যোগাযোগ</h4>
                        <ul className=''>
                            <h3 className='text-success'>কুসুমপুরা ইসলামিয়া দাখিল মাদ্রাসা,</h3>
                            <li><FontAwesomeIcon icon={faLocation} /> মধ্যম কুসুমপুরা, শান্তির হাট, পটিয়া, চট্রগ্রাম।</li>
                            <li><FontAwesomeIcon icon={faPhone} /> ফোন: 01880-667400</li>
                            <li><FontAwesomeIcon icon={faMessage} /> ই-মেইল: kidm.ctgbd@gmal.com</li>
                        </ul>
                        <div className='d-flex fs-2'>
                            <span>Follow on</span>
                            <Icon><FontAwesomeIcon icon={faFacebook} /></Icon>
                            <Icon><FontAwesomeIcon icon={faInstagram} /></Icon>
                            <Icon><FontAwesomeIcon icon={faMessage} /></Icon>
                        </div>

                    </Div>
                </div>
            </div>
            <ImportantLink />
            <Footer />
        </>
    );
};

export default Contact;