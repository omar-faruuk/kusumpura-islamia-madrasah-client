import axios from 'axios';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';


const AddHistory = ({ updateHistory, setUpdateHistory }) => {
    const navigate = useNavigate()
    const [text, setText] = useState('')
    const handleUpload = () => {
        const history = { text: text }
        if (!updateHistory) {
            axios.post('https://secret-badlands-60025.herokuapp.com/addHistory', history)
                .then(res => {
                    swal("Great!", "successfully added the history!", "success");
                    navigate('../manage-history')
                })
                .catch(err => console.log(err))
        } else {
            axios.patch(`https://secret-badlands-60025.herokuapp.com/updateHistory/${updateHistory._id}`, history)
                .then(res => {
                    if (res.data === true) {
                        swal("Great!", "successfully updated the history!", "success");
                        setUpdateHistory({})
                        navigate('../manage-history')

                    }
                })
                .catch(err => console.log(err))
        }

        console.log(text);
    }

    return (
        <div className='container'>
            {updateHistory ? <h2>update history</h2> : <h2>Add history</h2>}
            <div className="row">
                <div className="col-md-6">
                    <textarea defaultValue={updateHistory && updateHistory.text} rows="20" cols="" onChange={(e) => setText(e.target.value)} className='textArea form-control' autofocus></textarea>
                    <div className="mt-2">
                        <button onClick={handleUpload} className='btn-success border-0 p-1'>{updateHistory ? "update" : "Submit"}</button>

                    </div>



                </div>

                <div className="historyText  col-md-6 bg-light text-dark">
                    <ReactMarkdown>{text}</ReactMarkdown>
                </div>

            </div>
        </div>
    );
};

export default AddHistory;