import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faEmail } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'
import { userContex } from '../App';
import axios from 'axios';
import { getAuth, signOut } from "firebase/auth";
import swal from 'sweetalert';
const Container = styled.div`
  background-color: #182B49;
 
  color: white;
  font-style: 16px;
  
  
`
const Wrapper = styled.div`
 display: flex;
 justify-content: space-around;
 align-items: center;
 color: white;
 height: 40px;
 font-size: 16px;
`
const Left = styled.div`
 
 display: flex;
 align-items: center;
 /* font-size: 16px; */
 cursor: pointer;
 svg{
    margin-right: 8px;
    
    
 }
`
const Center = styled.div`
 display: flex;
 align-items: center;
 svg{
    margin-right: 0.7rem;
    font-size: 24px;
 }
 @media screen and (max-width:568px) {
      & {
        display: none;
      }
     
 }
`
const A = styled.a`
 color: white;
 cursor: pointer;
`
const Right = styled.div`
a{
    color: white;
    margin-right: 5px;
    cursor: pointer;
}
span{
    margin: 0 8px;
}

`
const TopBar = () => {
    const { login } = useContext(userContex);
    const [logedInUser, setLogedInUser] = login;
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        axios.post('https://secret-badlands-60025.herokuapp.com/isAdmin', { email: logedInUser.email })
            .then(res => setIsAdmin(res.data))
            .catch(err => console.log(err))

    }, [logedInUser.email])

    const handleLogOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            swal(
                {
                    title: "success sign out!",
                    icon: "success",
                    button: "ok"
                }
            )
            sessionStorage.clear()
            window.location.reload(false);
        }).catch((error) => {
            swal("Something wrong!")
        });
    }
    return (
        <Container className='navbar-sticky'>
            <Wrapper>
                <Left>
                    <span className='me-3 text-white'>
                        <FontAwesomeIcon icon={faHome} />
                        <Link className='text-white' to="/">Home</Link>
                    </span>
                    <span>
                        <FontAwesomeIcon icon={faPhone} />
                        01880-667400
                    </span>
                </Left>
                <Center>
                    <A target="_blank" href='https://www.facebook.com/kidm2019'><FontAwesomeIcon icon={faFacebook} /></A>
                    <A target="_blank" href='https://www.instagram.com/'><FontAwesomeIcon icon={faInstagram} /></A>


                </Center>
                <Right>

                    {logedInUser.email ?
                        <span style={{ cursor: "pointer" }} onClick={() => handleLogOut()}>LogOut</span> :
                        <span>
                            <Link to="/login">Login</Link>
                            <span>/</span>
                            <Link to="/register">Register</Link>
                        </span>
                    }
                    {isAdmin && <Link className='ms-2' to="/admin">Admin</Link>}
                </Right>
            </Wrapper>
        </Container>

    );
};

export default TopBar;