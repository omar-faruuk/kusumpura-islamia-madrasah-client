import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import AddTalk from './AddTalk';
import swal from 'sweetalert';
const Container = styled.div`
 /* height: 100vh; */

 background-color: #254683;
 @media screen and (max-width: 568px) {
     width: 80%;
     font-size: 12px;
 }
`
const ManageTalk = () => {
    const [Talks, setTalks] = useState([])
    const [updateTalk, setUpdateTalk] = useState({})
    useEffect(() => {
        axios.get('http://localhost:5000/Talks')
            .then(res => {
                console.log(res.data);
                setTalks(res.data)
            })
            .catch(err => console.log(err))
    }, [updateTalk])
    const handleUpdate = (e, Talk) => {
        setUpdateTalk(Talk)
    }
    const handleDelete = (e, id) => {
        axios.delete(`http://localhost:5000/deleteTalk/${id}`)
            .then(res => {
                if (res.status === 200) {
                    swal("Great!", "successfully deleted the Talk!", "success");
                    e.target.parentNode.parentNode.parentNode.style.display = "none";
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <Container className='container-fluid'>
            <h3>Manage Talk</h3>
            {
                updateTalk._id ? <AddTalk updateTalk={updateTalk} setUpdateTalk={setUpdateTalk} /> :
                    <div className="table-responsive">
                        <table className='table  bg-white '>
                            <thead className='table-dark'>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Board</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            {Talks.map(Talk => <tbody className='' key={Talk._id}>
                                <tr>
                                    <td>{Talk.name}</td>
                                    <td>{Talk.position}</td>
                                    <td>{Talk.board.slice(0, 20)}</td>
                                    <td>
                                        <div className='d-flex flex-md-row flex-column justify-content-center gap-2'>
                                            <button onClick={(event) => handleUpdate(event, Talk)} className="btn-info border-1 d-flex gap-1 align-items-center">
                                                <FontAwesomeIcon icon={faEdit} />edit</button>
                                            <button onClick={(e) => handleDelete(e, Talk._id)} className="btn-danger border-1 d-flex gap-1 align-items-center">
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

export default ManageTalk;