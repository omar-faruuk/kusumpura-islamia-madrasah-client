import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faFly } from '@fortawesome/free-brands-svg-icons';
import swal from 'sweetalert';
// import PDFViewer from 'pdf-viewer-reactjs';


const Container = styled.div`
  height: 45vh;
  background-color: #196d1b;
  display: flex;
  align-items:center;
  justify-content: center;
  flex-direction:column;
  @media screen and (max-width:568px) {
    height: 20vh;
    padding: 3rem 0;
  }
  
`
const Title = styled.h1`
 font-size: 70px;
 margin-bottom:15px;
 @media screen and (max-width:568px) {
    font-size:40px;
    margin-bottom: 10px;
  }
 
`
const Desc = styled.div`
 font-size:24px;
 font-weight:300;
 margin-bottom: 20px;
 @media screen and (max-width:568px) {
    text-align:center;
    font-size: 16px;
    margin-bottom: 12px;
  }
 
`
const InputContainer = styled.div`
  background-color: white;
  width: 50%;
  border: 1px solid lightgray;
  display: flex;
  justify-content:space-between;
  @media screen and (max-width:568px) {
    width: 90%;
  }
  
  
`
const Input = styled.input`
border: none;
outline:none;
flex: 8;
margin-left:12px;
padding: 8px;
font-size:15px;

`
const Button = styled.button`
flex: 1;
border: none;
background-color: black;
color: white;
cursor: pointer;
padding: 8px;
`
// const pdf = 'https://firebasestorage.googleapis.com/v0/b/kusumpura-islamia-dhakil.appspot.com/o/2022_06_20_14-28-20_pm.pdf?alt=media&token=2de49611-4245-4de2-91de-354a78c326dd'
const Newsletter = () => {
  const handleSubscribe = () => {
    swal("Good job!", "Thanks for subscribe!", "success");
  }
  return (
    <Container className='mb-5'>
      {/* src={`data:image/jpeg;base64,${image}`} */}
      {/* <iframe src={`data:application/pdf;base64,${pdf}`} /> */}
      <Title className='text-white'>Newsletter</Title>
      <Desc className='text-white'>Get The Latest News & Updates On Your Box</Desc>
      <InputContainer>
        <Input type="email" placeholder='your email' />
        <Button onClick={handleSubscribe} className=''>
          Send
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;

