import React from 'react';
import styled from 'styled-components';
import logo from '../images/logo.jpg'

const Div = styled.div`


  
`
const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: space-evenly;
align-items: center;
padding: 15px 0;


`
const Logo = styled.div`

`
const Image = styled.img`
 width: 135px;
 height: 140px;
 border-radius: 50%;
 object-fit: cover;
 @media screen and (max-width: 568px) {
    height: 130px;
 }
`
const Name = styled.div`
text-align: center;
`
const H1 = styled.h1`
font-weight: bold;
color: #3827a5;
@media screen and (max-width:568px) {
    font-size: 22px;
}

`
const H2 = styled.h2`
font-weight: bolder;
font-size: 34px;
font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
@media screen and (max-width:568px) {
    font-size: 30px;
}
`
const H3 = styled.h3`
font-family: Verdana, sans-serif;
font-weight: bold;
text-transform: uppercase;
font-size: 20px;
@media screen and (max-width:568px) {
    font-size: 14px;
}
`
const TopHeader = () => {
    return (
        <Div className='container'>
            <Wrapper>
                <Logo className='mx-md-0 mx-auto'>
                    <Image src={logo} />
                </Logo>

                <Name>

                    <H2 className='text-success'>.المدرسة الاسلامية الداخل کوشمفورا</H2>
                    <H1 className=''>কুসুমপুরা ইসলামিয়া দাখিল মাদ্রাসা।</H1>
                    <H3 className='fw-2'>Kusumpura Islamia dakhil Madrasah.</H3>
                </Name>
            </Wrapper>

        </Div>
    );
};

export default TopHeader;
