import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import styled from 'styled-components';
import { storage } from './../../Firebase.config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import  ReactMarkdown  from 'react-markdown';

const Image = styled.img`
 height: 45px;
`


const Container = styled.div`
background-color: #254683;
color: white;
padding: 1rem 0;
`
const AddTalk = ({ updateTalk, setUpdateTalk }) => {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0);
    const [imgUrl, setImgUrl] = useState(null);
    const [isLoading, setIsloading] = useState(false)
    const [text, setText] = useState('')
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        const talkData = {
            name: data.name,
            position: data.position,
            board: data.board,
            talk: text,
            image: !updateTalk || (updateTalk && imgUrl) ? imgUrl : updateTalk.image
        }
        if (!updateTalk) {
            axios.post('https://secret-badlands-60025.herokuapp.com/addTalk', talkData)
                .then(res => {
                    swal("Great!", "successfully added a quote!", "success");
                    navigate("../manage-talk", { replace: true })
                })
                .catch(err => console.log(err))
        } else (
            axios.patch(`https://secret-badlands-60025.herokuapp.com/updateTalk/${updateTalk._id}`, talkData)
                .then(res => {
                    swal("Great!", "successfully updated the quote!", "success");
                    navigate("../manage-talk",)
                    setUpdateTalk({})
                })
                .catch(err => console.log(err))
        )


        //   setUpdateTeacher({})



        reset();
    };

    // handle upload image to firebase storage
    const handleImg = (event) => {
        const file = event.target.files[0];
        uploadFile(file)
    }

    const uploadFile = (file) => {
        if (!file) return;
        const sotrageRef = ref(storage, `talk/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const prog = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setIsloading(true)
                setProgress(prog);
            },
            (error) => console.log(error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImgUrl(downloadURL)
                    setIsloading(false)
                });
            }
        );
    }

    return (
        <Container className='container-fluid'>
            <h2 className='text-white text-center'>{updateTalk ? 'update talk' : 'Add a talk'}</h2>
            <form className='p-md-5 p-2' onSubmit={handleSubmit(onSubmit)}>

                <div className="row">
                    <div className="col-md-5 mb-3 d-flex flex-column">
                        <label htmlFor="name">Name</label>
                        <input defaultValue={updateTalk && updateTalk.name} placeholder='Name' className='form-control' id='name' {...register("name", { required: true })} />
                    </div>
                    <div className="col-md-5  mb-3 d-flex flex-column">
                        <label htmlFor="position">Position</label>
                        <input defaultValue={updateTalk && updateTalk.position} placeholder='Position' className='form-control' id='position' {...register("position", { required: true })} />
                    </div>
                    <div className="col-md-5  mb-3 d-flex flex-column">
                        <label htmlFor="Board">Board</label>
                        <input defaultValue={updateTalk && updateTalk.board} placeholder='Position' className='form-control' id='position' {...register("board", { required: true })} />
                    </div>
                    <div className="col-md-4  d-flex flex-column justify-content-center">
                        <label htmlFor="img"><Image src="/teachers/fileUpload2.jpg" alt="" />Upload Image</label>
                        <input id='img' className='d-none form-control' type="file"  {...register("img")} onChange={handleImg} />
                        {isLoading && <h3>uploading done {progress}%</h3>}
                    </div>
                  
                    
                    <div className="col-md-5  mb-3 d-flex flex-column">
                        <label htmlFor="course">Talk</label>
                        <textarea defaultValue={updateTalk && updateTalk.talk} rows="20" cols="" onChange={(e) => setText(e.target.value)} className='textArea form-control' autofocus></textarea>
                    </div>
                    <div className="col-md-5 d-flex flex-column ">
                    <label htmlFor="course">Talk</label>
                    <ReactMarkdown className='bg-white text-dark h-100 rounded'>{text}</ReactMarkdown>
                    </div>
                    
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}
                    <div className='mt-3 w-100 d-flex justify-content-start'>
                        <button className='border-0    p-2 rounded' type='submit'>{updateTalk ? 'Update' : 'Submit'}</button>
                    </div>
                </div>
            </form>

           
        </Container>
    );
};

export default AddTalk;