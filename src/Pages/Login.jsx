import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import TopBar from '../Components/TopBar';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { userContex } from '../App';
import axios from 'axios';
import swal from 'sweetalert';


const Container = styled.div`
/* display: flex;
align-items: center;
justify-content: center;
height: 90vh; */
`
const Form = styled.form`
border: 1px solid lightgray;

`
const Google = styled.div`
cursor: pointer;
`

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { login } = useContext(userContex);
    const [logedInUser, setLogedInUser] = login;
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        axios.post('https://secret-badlands-60025.herokuapp.com/isAdmin', { email: logedInUser.email })
            .then(res => setIsAdmin(res.data))
            .catch(err => console.log(err))

    }, [logedInUser.email])
    let location = useLocation();
    let naviget = useNavigate();
    let { from } = location.state || { from: { pathname: "/" } };

    const onSubmit = (data) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential) => {
                const user = userCredential.user;
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
                    <div className="col-md-5 col-10 border p-md-4 rounded p-2 m-5">
                        <h3 className='text-center'>Log in</h3>
                        <form className='p-3' onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="userName">Email</label>
                                <input className='form-control' type="email" id='userName' {...register("email")} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userName">Password</label>
                                <input className='form-control' type="password" id='userName' {...register("password")} />
                            </div>
                            <button className="w-100 btn-success border-0 p-1">Login in</button>
                            <p className='text-secondary text-center'>Don't have any account? <Link to="/register">register</Link></p>
                        </form>
                        <h4 className='text-center pt-md-1'>Or</h4>
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

export default Login;