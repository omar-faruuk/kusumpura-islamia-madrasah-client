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
  font-size: 20px;
  margin-right: 8px;
}
`



const AddFunding = () => {
    const [allFunding, setAllFunding] = useState([])
    const [isDataLoad, setIsDataLoad] = useState(false)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/funding')
            .then(res => {
                setAllFunding(res.data)
                console.log(allFunding);
            }
            )
            .catch(err => console.log(err))
    }, [isDataLoad])
    const onSubmit = data => {

        const funding = {
            name: data.name,
            category: data.category
        }

        axios.post('https://secret-badlands-60025.herokuapp.com/addFunding', funding)
            .then(res => {
                res.data && reset()
                swal("Great!", "successfully added a doner!", "success");
                setIsDataLoad(true);
            })
            .catch(err => console.log(err))


    }


    //handle result delelte
    const handleDelete = (e, id) => {
        axios.delete(`https://secret-badlands-60025.herokuapp.com/deleteFunding/${id}`)
            .then(res => {
                if (res.status === 200) {
                    swal("Great!", "successfully deleted the fund!", "success");
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
                    <h3 className='text-center'>upload a doner</h3>
                    <form className='p-md-5 p-2' onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <label htmlFor="name">Doner name:</label>
                            <input id='name' className='form-control' type="text"  {...register("name", { required: true })} />
                        </div>

                        <div className="mb-3 d-flex flex-column">
                            <label htmlFor="category">Category</label>
                            <select id='category' {...register("category", { required: true })}>
                                <option value="ভুমি দাতা">ভুমি দাতা সদস্যঃ</option>
                                <option value="আর্থিক অনুদান দাতা">আর্থিক অনুদান দাতা সদস্যঃ</option>

                            </select>
                        </div>

                        <button className='btn-success border-0 p-1' type='submit'>Submit</button>
                    </form>
                </div>

                <div className='col-md-6'>
                    <h3 className='text-center mt-2'>All doner</h3>
                    <ol className='p-md-5 p-2 border'>
                        {

                            allFunding.map(fund => <Li key={fund._id} className='p-2'><h3>{fund.name}</h3><button onClick={(e) => handleDelete(e, fund._id)} className='btn-danger border-0 ms-4 px-2 rounded'>delete</button></Li>)
                        }
                    </ol>
                </div>
            </div>


        </div>
    );
};

export default AddFunding;