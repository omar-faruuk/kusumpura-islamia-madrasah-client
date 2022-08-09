import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import styled from 'styled-components';

import axios from 'axios';
import { storage } from '../../Firebase.config';
import swal from 'sweetalert';

const Li = styled.li`
margin-bottom: 10px;
border-bottom: 1px solid lightGray;
`




const AddNotice = () => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsloading] = useState(false)
    const [allNotice, setAllNotice] = useState([])
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/notice')
            .then(res => setAllNotice(res.data))
            .catch(err => console.log(err))
    })

    const onSubmit = data => {

        const notice = {
            title: data.title,
            pdf: pdfUrl,
            date: data.date
        }
        console.log(notice);
        pdfUrl && axios.post('https://secret-badlands-60025.herokuapp.com/addNotice', notice)
            .then(res => {
                res.data && reset()
                swal("Great!", "successfully added a notice!", "success");
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

    //handle notice delelte
    const handleDelete = (e, id) => {
        axios.delete(`https://secret-badlands-60025.herokuapp.com/deleteNotice/${id}`)
            .then(res => {
                if (res.status === 200) {
                    swal("Great!", "successfully deleted the notice!", "success");
                    e.target.parentNode.style.display = "none";
                }

            })
            .catch(err => console.log(err))
    }

    return (
        <div className='container'>
            <h2>add notice</h2>
            <div className="row">
                <div className="col-md-6 d-flex">
                    <form className='p-md-5 p-2' onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="pdf">Select an image</label>
                            <input id='pdf' className='form-control' type="file"  {...register("pdf", { required: false })} onChange={handleImg} />
                            {isLoading && <h3>uploading done {progress}%</h3>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="title">Title</label>
                            <input id='title' className='form-control' type="text"  {...register("title", { required: true })} />
                        </div>
                        <div className="mb-3 d-flex flex-column">
                            <label htmlFor="class">Class</label>
                            <input className='form-control' defaultValue={new Date()} type="date" {...register("date")} />
                        </div>

                        <button className='btn-success border-0 p-1' type='submit'>Submit</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <h3>all notice</h3>
                    <ol className='p-md-5 p-2 border'>
                        {

                            allNotice.map(noti => <Li key={noti._id} className=''><h3>{noti.title}</h3><button onClick={(e) => handleDelete(e, noti._id)} className='btn-danger border-0 p-1'>delete</button></Li>)
                        }
                    </ol>
                </div>

            </div>

            {pdfUrl && <a target="_blank" href={pdfUrl}>view Pdf</a>}
            {/* <iframe id="fred"  title="PDF in an i-Frame" src={pdfUrl} frameBorder="1" scrolling="auto" height="100%" width="100%" ></iframe> */}
        </div>
    );
};

export default AddNotice;