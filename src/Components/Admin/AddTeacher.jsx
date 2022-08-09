import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import styled from 'styled-components';
import { storage } from './../../Firebase.config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

const Image = styled.img`
 height: 45px;
`


const Container = styled.div`
background-color: #254683;
color: white;
padding: 1rem 0;
`
const AddTeacher = ({ updateTeacher, setUpdateTeacher }) => {
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0);
    const [imgUrl, setImgUrl] = useState(null);
    const [isLoading, setIsloading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        const teacherData = {
            name: data.name,
            position: data.position,
            qualification: data.qualification,
            course: data.course,
            image: !updateTeacher || (updateTeacher && imgUrl) ? imgUrl : updateTeacher.image
        }
        if (!updateTeacher) {
            axios.post('https://secret-badlands-60025.herokuapp.com/addTeacher', teacherData)
                .then(res => {
                    swal("Great!", "successfully added a teacher!", "success");
                    navigate("../manage-teacher", { replace: true })
                })
                .catch(err => console.log(err))
        } else (
            axios.patch(`https://secret-badlands-60025.herokuapp.com/updateTeacher/${updateTeacher._id}`, teacherData)
                .then(res => {
                    swal("Great!", "successfully updated the teacher!", "success");
                    navigate("../manage-teacher",)
                    setUpdateTeacher({})
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
        const sotrageRef = ref(storage, `teachers/${file.name}`);
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
            <h2 className='text-white text-center'>{updateTeacher ? 'update teacher' : 'Add a teacher'}</h2>
            <form className='p-md-5 p-2' onSubmit={handleSubmit(onSubmit)}>

                <div className="row">
                    <div className="col-md-5 mb-3 d-flex flex-column">
                        <label htmlFor="name">Name</label>
                        <input defaultValue={updateTeacher && updateTeacher.name} placeholder='Name' className='form-control' id='name' {...register("name", { required: true })} />
                    </div>
                    <div className="col-md-5  mb-3 d-flex flex-column">
                        <label htmlFor="position">Position</label>
                        <input defaultValue={updateTeacher && updateTeacher.position} placeholder='Position' className='form-control' id='position' {...register("position", { required: true })} />
                    </div>
                    <div className="col-md-5  mb-3 d-flex flex-column">
                        <label htmlFor="qualification">Qualification</label>
                        <textarea defaultValue={updateTeacher && updateTeacher.qualification} rows="4" cols="50" placeholder='Qualification...' className='form-control' id='qualification' {...register("qualification", { required: true })} />
                    </div>
                    <div className="col-md-5  mb-3 d-flex flex-column">
                        <label htmlFor="course">Course</label>
                        <textarea defaultValue={updateTeacher && updateTeacher.course} placeholder='Course...' rows="4" cols="50" className='form-control' id='course' {...register("course", { required: false })} />
                    </div>
                    <div className="col-md-4  d-flex flex-column justify-content-center">
                        <label htmlFor="img"><Image src="/teachers/fileUpload2.jpg" alt="" />Upload Image</label>
                        <input id='img' className='d-none form-control' type="file"  {...register("img")} onChange={handleImg} />
                    </div>
                    <div className="col-md-4">
                        {isLoading && <h3>uploading done {progress}%</h3>}
                    </div>
                    {/* errors will return when field validation fails  */}
                    {errors.exampleRequired && <span>This field is required</span>}
                    <div className='mt-3 w-100 d-flex justify-content-start'>
                        <button className='border-0    p-2 rounded' type='submit'>{updateTeacher ? 'Update' : 'Submit'}</button>
                    </div>
                </div>
            </form>


        </Container>
    );
};

export default AddTeacher;