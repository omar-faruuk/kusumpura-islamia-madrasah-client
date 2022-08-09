import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import TopBar from './TopBar';
import TopHeader from './TopHeader';
import Navbar from '../Layout/Navbar';
import ImportantLink from './ImportantLink';
import Footer from './Footer';

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
list-style-type: none;
margin-bottom: 10px;
& svg{
  color: red;
  font-size: 30px;
  margin-right: 8px;
}
`

const Result = () => {
  const [allResult, setAllResult] = useState([])
  const [showAllResult, setShowAllResult] = useState([])
  useEffect(() => {
    axios.get('https://secret-badlands-60025.herokuapp.com/result')
      .then(res => setAllResult(res.data))
      .catch(err => console.log(err))
  }, [])
  const one = []
  const two = []
  const three = []
  const four = []
  const five = []
  const six = []
  const seven = []
  const nine = []
  const ten = []

  const handleResult = (clas) => {
    const classResult = allResult.filter(re => re.class === clas);
    setShowAllResult(classResult);

  }

  return (
    <>
      <TopBar />
      <TopHeader />
      <Navbar />
      <div className="container">
        <TitleWrapper>
          <Title>রেজাল্ট</Title>
        </TitleWrapper>
        <div className="row">
          <div className="col-3 col-md-2 d-flex flex-column">
            <button className='btn btn-secondary border  p-1'>ফিল্টার করুন</button>
            <button onClick={() => handleResult("0")} className='btn btn-outline border  p-1'>শিশু শ্রেণি</button>
            <button onClick={() => handleResult("1")} className='btn btn-outline border  p-1'>১ম শ্রেণি</button>
            <button onClick={() => handleResult("2")} className='btn btn-outline border  p-1'>২য় শ্রেণি</button>
            <button onClick={() => handleResult("3")} className='btn btn-outline border  p-1'>৩য় শ্রেণি</button>
            <button onClick={() => handleResult("4")} className='btn btn-outline border  p-1'>৪র্থ শ্রেণি</button>
            <button onClick={() => handleResult("5")} className='btn btn-outline border  p-1'>৫ম শ্রেণি</button>
            <button onClick={() => handleResult("6")} className='btn btn-outline border  p-1'>৬ষ্ঠ শ্রেণি</button>
            <button onClick={() => handleResult("7")} className='btn btn-outline border  p-1'>৭ম শ্রেণি</button>
            <button onClick={() => handleResult("8")} className='btn btn-outline border  p-1'>৮ম শ্রেণি</button>
            <button onClick={() => handleResult("9")} className='btn btn-outline border  p-1'>৯ম শ্রেণি</button>
            <button onClick={() => handleResult("10")} className='btn btn-outline border  p-1'>দাখিল ১০ম শ্রেণি</button>
          </div>
          <div className="col-9 col-md-8">
            {allResult.length ? <ul>
              {
                showAllResult.length ? showAllResult.slice(0).reverse().map(res => <Li key={res._id} className=''> <a target="_blank" className='d-flex align-items-center' href={res.pdf}><FontAwesomeIcon icon={faFilePdf} /><h3>{res.title}</h3></a></Li>) :
                  allResult.slice(0, 5).reverse().map(res => <Li key={res._id} className=''> <a target="_blank" className='d-flex align-items-center' href={res.pdf}><FontAwesomeIcon icon={faFilePdf} /><h3>{res.title}</h3></a></Li>)
              }
            </ul> :
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

export default Result;