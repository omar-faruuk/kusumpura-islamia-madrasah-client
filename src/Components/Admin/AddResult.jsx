import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import styled from 'styled-components';
import axios from 'axios';
import { storage } from '../../Firebase.config';
import swal from 'sweetalert';

const Li = styled.li`
/* margin-bottom: 10px; */
border: 1px solid lightGray;

& svg{
  color: red;
  font-size: 30px;
  margin-right: 8px;
}
`



const AddResult = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [allResult, setAllResult] = useState([])
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsloading] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/result')
            .then(res => setAllResult(res.data))
            .catch(err => console.log(err))
    }, [])
    const onSubmit = data => {

        const result = {
            title: data.title,
            pdf: pdfUrl,
            class: data.class
        }

        pdfUrl && axios.post('https://secret-badlands-60025.herokuapp.com/addResult', result)
            .then(res => {
                res.data && reset()
                swal("Great!", "successfully added a result!", "success");
            })
            .catch(err => console.log(err))


    }

    // handle upload image to firebase storage
    const handleImg = (event) => {
        const file = event.target.files[0];
        uploadFile(file)
    }

    const uploadFile = (file) => {
        if (!file) return;
        const sotrageRef = ref(storage, `result/${file.name}`);
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
                    setPdfUrl(downloadURL)
                    setIsloading(false)
                });
            }
        );
    }

    //handle result delelte
    const handleDelete = (e, id) => {
        axios.delete(`https://secret-badlands-60025.herokuapp.com/deleteResult/${id}`)
            .then(res => {
                if (res.status === 200) {
                    swal("Great!", "successfully deleted the result!", "success");
                    e.target.parentNode.style.display = "none";
                    console.log(e.target.parentNode);
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <div className='container bg-light'>
            <div className="row">
                <div className="col-md-5 border bg-white  p-3">
                    <h3 className='text-center'>upload a result</h3>
                    <form className='p-md-5 p-2' onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="pdf">Select a pdf/img</label>
                            <input id='pdf' className='form-control' type="file"  {...register("pdf", { required: true })} onChange={handleImg} />
                            {isLoading && <h3>uploading done {progress}%</h3>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title">Title</label>
                            <input id='title' className='form-control' type="text"  {...register("title", { required: true })} />
                        </div>
                        <div className="mb-3 d-flex flex-column">
                            <label htmlFor="class">Class</label>
                            <select id='class' {...register("class", { required: true })}>
                                <option value="0">play</option>
                                <option value="1">one</option>
                                <option value="2">two</option>
                                <option value="3">three</option>
                                <option value="4">four</option>
                                <option value="5">five</option>
                                <option value="6">six</option>
                                <option value="7">seven</option>
                                <option value="8">eight</option>
                                <option value="9">nine</option>
                                <option value="10">ten</option>
                            </select>
                        </div>

                        <button className='btn-success border-0 p-1' type='submit'>Submit</button>
                    </form>
                </div>

                <div className='col-md-6'>
                    <h3 className='text-center mt-2'>All result</h3>
                    <ol className='p-md-5 p-2 border'>
                        {

                            allResult.map(res => <Li key={res._id} className='p-2'><h3>{res.title}</h3><button onClick={(e) => handleDelete(e, res._id)} className='btn-danger border-0 ms-4 px-2 rounded'>delete</button></Li>)
                        }
                    </ol>
                </div>
            </div>


        </div>
    );
};

export default AddResult;