import axios from 'axios';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';


const Project = ({ updateProject, setUpdateProject }) => {
    const navigate = useNavigate()
    const [text, setText] = useState('')
    const handleUpload = () => {
        const project = { text: text }
        if (!updateProject) {
            axios.post('https://secret-badlands-60025.herokuapp.com/addProject', project)
                .then(res => {
                    swal("Great!", "successfully added the history!", "success");
                    navigate('../manage-project')
                })
                .catch(err => console.log(err))
        } else {
            axios.patch(`https://secret-badlands-60025.herokuapp.com/updateProject/${updateProject._id}`, project)
                .then(res => {
                    if (res.data === true) {
                        swal("Great!", "successfully updated the history!", "success");
                        setUpdateProject({})
                        navigate('../manage-project')

                    }
                })
                .catch(err => console.log(err))
        }

        console.log(text);
    }

    return (
        <div className='container'>
            {updateProject ? <h2>update project</h2> : <h2>Add project</h2>}
            <div className="row">
                <div className="col-md-6">
                    <textarea defaultValue={updateProject && updateProject.text} rows="20" cols="" onChange={(e) => setText(e.target.value)} className='textArea form-control' autofocus></textarea>
                    <div className="mt-2">
                        <button onClick={handleUpload} className='btn-success border-0 p-1'>{updateProject ? "update" : "Submit"}</button>

                    </div>



                </div>

                <div className="historyText  col-md-6 bg-light text-dark">
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>

            </div>
        </div>
    );
};

export default Project;