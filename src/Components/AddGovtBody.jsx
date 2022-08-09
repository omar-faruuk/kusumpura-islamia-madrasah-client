import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import swal from 'sweetalert';

const Ol = styled.ol`
& li{
    margin-bottom: 8px;
    border-bottom: 1px solid gray;
    padding: 10px;
    display: flex;
}
`
const AddGovtBody = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [govtBody, setGovtBody] = useState([])
    const [loadData, setLoadData] = useState(false)
    console.log(govtBody);
    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/govtBody')
            .then(res => setGovtBody(res.data))
            .catch(err => console.log(err))
    }, [loadData])
    const onSubmit = data => {
        const body = { name: data.name, position: data.position };
        axios.post('https://secret-badlands-60025.herokuapp.com/addGovtBody', body)
            .then(res => {
                setLoadData(res.data)
                swal("Great!", "successfully added a Govt body!", "success");
            })
            .catch(err => console.log(err))
    }
    const handleDelete = (e, id) => {
        axios.delete(`https://secret-badlands-60025.herokuapp.com/deleteGovtBody/${id}`)
            .then(res => {
                if (res.status === 200) {
                    swal("Great!", "successfully deleted the Govt body!", "success");
                    e.target.parentNode.style.display = "none";
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div className="container">
            <h2 className='mt-3'>গভর্ণিংবডি</h2>
            <div className="row">
                <div className="col-md-5">
                    <form className='p-md-3 p-2  border' onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-3">
                            <input className='form-control' placeholder='name' type="text" {...register("name", { required: true })} />
                        </div>
                        <div className=" mb-3">
                            <input className='form-control' placeholder='position' type="text" {...register("position", { required: true })} />
                        </div>
                        <button className='btn-success border-0 p-1 rounded'>Submit</button>
                    </form>
                </div>
                <div className="col-md-6 border p-md-3">
                    <Ol className=''>
                        {
                            govtBody.map(g => <li><span className=''>{g.name}-{g.position}</span> <button onClick={(e) => handleDelete(e, g._id)} className='ms-3 btn-danger border-0 p-md-1 h-50'>delete</button></li>)
                        }
                    </Ol>
                </div>
            </div>
        </div>
    );
};

export default AddGovtBody;