import React, { useContext, useEffect, useState } from 'react';
import { faFacebook, faInstagram, } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faLocation, faMessage, faPhone, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { userContex } from '../App';

const Li = styled.li`

 
& a{
    cursor: pointer;
    color: white;
    text-decoration: underline;
}

`
const Icon = styled.span`
 margin-left: 16px;
 color: white;
`
const Row = styled.div`
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
a{
    
}

& ul{
    margin-left: 16px;
}
& li{
    margin-bottom: 8px;
    &:hover a{
        text-decoration: underline;
    }
}
`
const Contact = styled.div`
& ul{
    margin-left: 0;
}
& li{
    list-style-type: none;
    margin-bottom: 5px;
    
}
`
const ImportantLink = () => {
    const [allNotice, setAllNotice] = useState([])
    const { not } = useContext(userContex);
    const [notice, setNotice] = not;
    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/notice')
            .then(res => setAllNotice(res.data))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="container-fluid mt-5 " id='footer'>
            <Row className="row" id='importantLink'>
                <div className="col-md-3 { userContex } from './../App';
                 d-3">

                    <h4 className='bg-success text-white p-2'>ডাউনলোড লিংক</h4>
                    <ul className='text-white'>
                        <li><a href="#">কুসুমপুরা ইসলামিয়া দাখিল মাদ্রাসা ভর্তি ফরম ২০২২।</a></li>


                    </ul>
                </div>
                <div className="col-md-3 ">
                    <h4 className='bg-success text-white p-2'>নোটিশ বোর্ড</h4>
                    <ul className='text-white'>
                        {
                            allNotice.slice(0, 6).reverse().map(data =>
                                <Li key={data._id} className=''>
                                    <Link to="/showNotice" onClick={() => setNotice(data)} className=''>{data.title}।</Link>


                                </Li>)
                        }


                    </ul>
                </div>
                <div className="col-md-3">
                    <h4 className='bg-success text-white p-2'>গুরুত্বপূর্ণ লিংক</h4>
                    <ul className='text-white'>
                        <li><a target="_blank" href="http://www.bmeb.gov.bd/">বাংলাদেশ মাদ্রাসা শিক্ষা বোর্ড।</a></li>
                        <li><a target="_blank" href="https://www.facebook.com/kidm2019">কুসুমপুরা ইসলামিয়া মাদ্রাসা ফেসবুক পেজ।</a></li>
                        <li><a target="_blank" href="https://www.jasa.edu.bd/#">জামেয়া আহমদিয়া সুন্নিয়া কামিল মাদরাসা।</a></li>
                        <li><a target="_blank" href="http://www.educationboard.gov.bd/">বাংলাদেশ মাধ্যমিক ও উচ্চ মাধ্যমিক শিক্ষা বোর্ড।</a></li>
                        <li><a target="_blank" href="http://patiya.chittagong.gov.bd/">পটিয়া উপজে।</a></li>
                        <li><a target="_blank" href="http://kusumpuraup.chittagong.gov.bd/">কুসুমপুরা ইউনিয়ন পরিষদ।</a></li>


                    </ul>
                </div>
                <Contact className="col-md-3">
                    <h4 className='bg-success text-white p-2'>যোগাযোগ</h4>
                    <ul className='text-white'>
                        <h5>কুসুমপুরা ইসলামিয়া দাখিল মাদ্রাসা,</h5>
                        <li><FontAwesomeIcon icon={faLocation} /> মধ্যম কুসুমপুরা, শান্তির হাট, পটিয়া, চট্রগ্রাম।</li>
                        <li><FontAwesomeIcon icon={faPhone} /> ফোন: 01880-667400</li>
                        <li><FontAwesomeIcon icon={faMessage} /> ই-মেইল: kidm.ctgbd@gmal.com</li>
                    </ul>
                    <div className='d-flex  text-white fs-md-3 fs-5'>
                        <span>Follow on</span>
                        <a target="_blank" href="https://www.facebook.com/kidm2019"><Icon><FontAwesomeIcon icon={faFacebook} /></Icon></a>
                        <a target="_blank" href="https://www.instagram.com/accounts/login/?next=/kidm.2019/"><Icon><FontAwesomeIcon icon={faInstagram} /></Icon></a>

                    </div>

                </Contact>
            </Row>
        </div>
    );
};

export default ImportantLink;