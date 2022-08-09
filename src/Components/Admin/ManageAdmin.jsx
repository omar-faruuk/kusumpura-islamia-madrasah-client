import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import swal from 'sweetalert';

const Li = styled.li`
margin-bottom: 10px;
border-bottom: 1px solid lightGray;
padding: 10px 0;
`

const ManageAdmin = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [adminCollection, setAdminCollection] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/admin')
            .then(res => setAdminCollection(res.data))
            .catch(err => console.log(err))
    }, [isLoading])

    const onSubmit = data => {
        axios.post('https://secret-badlands-60025.herokuapp.com/addAdmin', { adminEmail: data.email })
            .then(res => {
                if (res.data === true) {
                    swal("Great!", "successfully added an admin!", "success");
                    setIsLoading(res.data)
                }
            })
            .catch(err => console.log(err))
    }

    //handle admin delelte
    const handleDelete = (e, id) => {
        axios.delete(`https://secret-badlands-60025.herokuapp.com/deleteAdmin/${id}`)
            .then(res => {
                if (res.status === 200) {
                    swal("Great!", "successfully deleted the admin!", "success");
                    e.target.parentNode.style.display = "none";
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div className='container bg-light'>
            <div className="row g-5 mt-5 p-md-5">
                <div className="col-md-5 border">
                    <h3 className='text-center mt-2'>Make an admin</h3>
                    <form className='p-md-4 p-2' onSubmit={handleSubmit(onSubmit)}>
                        <input className='form-control' placeholder='enter an email' type="email"  {...register("email")} />
                        <button type='submit' className='btn-success mt-1 border-0 p-1 w-100'>Submit</button>
                    </form>


                </div>

                <div className="col-md-5 border">
                    <h3 className='text-center mt-2'>Admin collection</h3>
                    <ol className='ms-2'>
                        {
                            adminCollection.map(admin => <Li><span>{admin.adminEmail}</span><button onClick={(e) => handleDelete(e, admin._id)} className='btn-danger border-0  mx-3 p-1'>delete</button></Li>)
                        }
                    </ol>
                </div>
            </div>

        </div>
    );
};

export default ManageAdmin;