import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AddTeacher from './AddTeacher';
import swal from 'sweetalert';
const Container = styled.div`
 /* height: 100vh; */

 background-color: #254683;
 @media screen and (max-width: 568px) {
     width: 80%;
     font-size: 12px;
 }
`
const ManageTeacher = () => {
    const [teachers, setTeachers] = useState([])
    const [updateTeacher, setUpdateTeacher] = useState({})
    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/teachers')
            .then(res => {
                console.log(res.data);
                setTeachers(res.data)
            })
            .catch(err => console.log(err))
    }, [updateTeacher])
    const handleUpdate = (e, teacher) => {
        setUpdateTeacher(teacher)
    }
    const handleDelete = (e, id) => {
        axios.delete(`https://secret-badlands-60025.herokuapp.com/deleteTeacher/${id}`)
            .then(res => {
                if (res.status === 200) {
                    swal("Great!", "successfully deleted the teacher!", "success");
                    e.target.parentNode.parentNode.parentNode.style.display = "none";
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <Container className='container-fluid'>
            <h3>Manage teacher</h3>
            {
                updateTeacher._id ? <AddTeacher updateTeacher={updateTeacher} setUpdateTeacher={setUpdateTeacher} /> :
                    <div className="table-responsive">
                        <table className='table  bg-white '>
                            <thead className='table-dark'>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Qualification</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            {teachers.map(teacher => <tbody className='' key={teacher._id}>
                                <tr>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.position}</td>
                                    <td>{teacher.qualification.slice(0, 20)}</td>
                                    <td>
                                        <div className='d-flex flex-md-row flex-column justify-content-center gap-2'>
                                            <button onClick={(event) => handleUpdate(event, teacher)} className="btn-info border-1 d-flex gap-1 align-items-center">
                                                <FontAwesomeIcon icon={faEdit} />edit</button>
                                            <button onClick={(e) => handleDelete(e, teacher._id)} className="btn-danger border-1 d-flex gap-1 align-items-center">
                                                <FontAwesomeIcon icon={faDeleteLeft} />delete</button>
                                        </div>
                                    </td>

                                </tr>
                            </tbody>)}

                        </table>
                    </div>
            }

        </Container>
    );
};

export default ManageTeacher;