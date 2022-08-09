import axios from 'axios';
import React, { useEffect, useState } from 'react';

import swal from 'sweetalert';
import Project from './Project';

const ManageProject = () => {
    const [project, setProject] = useState([])
    const [updateProject, setUpdateProject] = useState({})
    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/project')
            .then(res => setProject(res.data))
            .catch(err => console.log(err))
    }, [updateProject])
    const handleUpdate = (e, h) => {
        setUpdateProject(h)
    }
    const handleDelete = (e, id) => {
        axios.delete(`https://secret-badlands-60025.herokuapp.com/deleteProject/${id}`)
            .then(res => {
                if (res.status === 200) {
                    swal("Great!", "successfully deleted the history!", "success");
                    e.target.parentNode.parentNode.style.display = "none";
                }

            })
            .catch(err => console.log(err))
    }
    return (
        <div className='container '>
            <h2>Manage project</h2>
            {updateProject._id ? <Project updateProject={updateProject} setUpdateProject={setUpdateProject} /> :
                <div className="row">

                    <ol className='mx-3 border p-3'>
                        {
                            project.map(proj => <li className='mx-2 border-bottom p-3' key={proj._id}>
                                {proj.text.slice(0, 100)}
                                <div className="d-flex">
                                    <button onClick={(event) => handleUpdate(event, proj)} className='mt-1 btn-success border-0 p-md-1'>update project</button>
                                    <button onClick={(e) => handleDelete(e, proj._id)} className='ms-3 btn-danger border-0 p-md-1'>delete project</button>
                                </div>
                            </li>)
                        }
                    </ol>

                </div>}

        </div>
    );
};

export default ManageProject;