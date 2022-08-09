import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import styled from 'styled-components';

import axios from 'axios';
import { storage } from '../../Firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhotoVideo } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';







const AddBanner = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsloading] = useState(false)
    const [banner, setBanner] = useState([])
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/banner')
            .then(res => setBanner(res.data))
            .catch(err => console.log(err))
    }, [isLoading])

    const onSubmit = data => {
        const banner = {
            banner: pdfUrl,
        }
        console.log(banner);
        pdfUrl && axios.post('https://secret-badlands-60025.herokuapp.com/addBanner', banner)
            .then(res => {
                res.data && reset()
                res.data && setIsloading(true)
                swal("Great!", "successfully added a banner!", "success");
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

    const handleDelete = (e, id) => {
        axios.delete(`https://secret-badlands-60025.herokuapp.com/deleteBanner/${id}`)
            .then(res => {
                if (res.status === 200) {
                    swal("Great!", "successfully deleted the banner!", "success");
                    e.target.parentNode.parentNode.style.display = "none";
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <div className='container'>
            <h2>add Banner</h2>
            <div className="d-flex">
                <form className='p-md-3 p-2' onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="pdf">Select a banner image</label>
                        <input id='pdf' className='form-control' type="file"  {...register("pdf", { required: false })} onChange={handleImg} />
                        {isLoading && <h3>uploading done {progress}%</h3>}
                    </div>

                    <button className='btn-success border-0 p-1' type='submit'>Submit</button>
                </form>
            </div>
            <h4>All banner</h4>
            <div className='p-md-3 p-2 w-md-25'>
                <ol className='border'>
                    {
                        banner.map(b => <li className='border-bottom p-3'><FontAwesomeIcon className='fs-3' icon={faPhotoVideo} /><span><button onClick={(e) => handleDelete(e, b._id)} className='btn-danger ms-3'>delete</button></span></li>)
                    }
                </ol>
            </div>


        </div>
    );
};

export default AddBanner;