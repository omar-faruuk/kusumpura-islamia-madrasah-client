import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import styled from 'styled-components';
import { storage } from './../../Firebase.config';
import axios from 'axios';
import { userContex } from './../../App';
import swal from 'sweetalert';

const Img = styled.img`
height: 50px;
`
const Title = styled.h2`
 
`
const InputContainer = styled.div`
width: 25%;
@media screen and (max-width:600px) {
    width: 75%;
}
`
const Label = styled.label`
cursor: pointer;
`
const Card = styled.div`
  position: relative;
  
  &:hover .middle{
    display: block;
    background: rgba(0, 0, 0, .6);
  }

`
const Image = styled.img`
 height: 300px;
 width: 100%;
 object-fit: cover;
 transition: 1s ease;
`
const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
    display: none;
    color: #FFF;

    & > button{
        margin-top: 42%;
        background-color: #ad0c0c;
        color: white;
        border: none;
        padding: 8px 10px;
        text-transform: uppercase;
        border-radius: 5px;
        
    }

    
    

`


const ImgGallery = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [progress, setProgress] = useState(0);
    const [imgUrl, setImgUrl] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [photos, setPhotos] = useState([])
    const [refresh, setRefresh] = useState(false);


    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/photos')
            .then(res => setPhotos(res.data))
            .catch(err => console.log(err))
    }, [refresh])

    const onSubmit = data => {
        const imgData = { image: imgUrl }
        imgUrl && axios.post('https://secret-badlands-60025.herokuapp.com/addImageGallery', imgData)
            .then(res => {
                reset()
                setRefresh(true)
                swal("Great!", "successfully uploaded!", "success");
                setImgUrl(null)

            })
            .catch(err => console.log(err))
    }
    const handleImg = (e) => {
        const file = e.target.files[0]
        uploadFile(file)
    }
    //upload image on firebase store
    const uploadFile = (file) => {
        if (!file) return;
        const sotrageRef = ref(storage, `imageGallery/${file.name}`);
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

    // delete image from database
    const handleDelete = (e, id) => {
        axios.delete(`https://secret-badlands-60025.herokuapp.com/deletePhoto/${id}`)
            .then(res => {
                if (res.status === 200) {
                    swal("Great!", "successfully deleted the image!", "success");
                    e.target.parentNode.parentNode.style.display = "none";
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='text-center bg-light container-fluid'>
            <Title className='text-center'>Manage photo gallery</Title>
            <form className='' onSubmit={handleSubmit(onSubmit)}>
                <InputContainer className='border border-secondary p-1 mx-auto'>
                    <Label htmlFor="img"><Img src="/teachers/fileUpload2.jpg" alt="" />Upload Image</Label>
                    <input id='img' className='d-none form-control' type="file"  {...register("img")} onChange={handleImg} />

                </InputContainer>
                <button className='btn-primary text-white mx-4 border-0 p-1'>Submit</button>
            </form>
            {isLoading && <h3>uploading done {progress}%</h3>}
            <div className="row g-2 mt-5">
                {photos.map(photo => <div key={photo._id} className='col-md-4'>
                    <Card className="card">
                        <Image className='img-fluid' src={photo.image} alt="" />
                        <Overlay className='middle'>
                            <button onClick={(e) => handleDelete(e, photo._id)}>delete</button>
                        </Overlay>
                    </Card>

                </div>)}
            </div>
        </div>
    );
};

export default ImgGallery;