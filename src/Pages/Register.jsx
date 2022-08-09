import React, { useContext, useEffect, useState } from 'react';
import TopBar from '../Components/TopBar';
import { useForm } from 'react-hook-form'
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from '../Firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { userContex } from './../App';
import swal from 'sweetalert';
import axios from 'axios';

const Container = styled.div`



`
const Google = styled.div`
cursor: pointer;
`

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { login } = useContext(userContex);
    const [logedInUser, setLogedInUser] = login;
    let location = useLocation();
    let naviget = useNavigate();
    let { from } = location.state || { from: { pathname: "/" } };
    const [isAdmin, setIsAdmin] = useState(false)


    useEffect(() => {
        axios.post('https://secret-badlands-60025.herokuapp.com/isAdmin', { email: logedInUser.email })
            .then(res => setIsAdmin(res.data))
            .catch(err => console.log(err))

    }, [logedInUser.email])


    const onSubmit = data => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
                if (user) {
                    swal("Good job!", "Thanks for signing up here!", "success");
                    const SignInuser = {
                        name: user.displayName,
                        email: user.email,

                    }
                    setLogedInUser(SignInuser)
                    sessionStorage.setItem('token', user.accessToken)
                    naviget(from)

                }
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                swal({
                    text: `${errorMessage}!`,
                    icon: "error",
                    button: "ok",
                });
            });

    }

    //handle google sing in
    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                if (user) {
                    swal({
                        title: `Hi ${user.displayName},`,
                        text: "Thanks for signing up here!",
                        icon: "success",
                        button: "ok",
                    });
                    const SignInuser = {
                        name: user.displayName,
                        email: user.email,

                    }
                    setLogedInUser(SignInuser)
                    sessionStorage.setItem('token', token)
                    naviget(from)
                }
                console.log(user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                swal({
                    text: `${errorMessage}!`,
                    icon: "error",
                    button: "ok",
                });
            });

    }
    return (
        <>
            <TopBar />
            <Container className="container">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-5 col-10 border p-md-4 rounded p-3 m-5">
                        <h3 className='text-center'>Sign up</h3>
                        <form className='p-3' onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="userName">Name</label>
                                <input className='form-control' type="text" id='userName' {...register("userName")} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userName">Email</label>
                                <input className='form-control' type="email" id='userName' {...register("email")} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userName">Password</label>
                                <input className='form-control' type="password" id='userName' {...register("password")} />
                            </div>
                            <button className="w-100 btn-success border-0 p-1">Sign up</button>
                            <p className='text-secondary text-center'>already have an account? <Link to="/login">Login</Link></p>
                        </form>
                        <h4 className='text-center'>Or</h4>
                        <Google onClick={handleGoogleLogin} className="bg-danger text-white p-2 d-flex justify-content-around align-items-center">
                            <FontAwesomeIcon icon={faGoogle} />
                            <span>Continue with Google</span>
                        </Google>
                    </div>
                </div>
            </Container>
        </>
    );
};

export default Register;