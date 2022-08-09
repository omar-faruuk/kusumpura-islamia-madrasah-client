import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AddHistory from './AddHistory';
import swal from 'sweetalert';

const ManageHistory = () => {
    const [history, setHistory] = useState([])
    const [updateHistory, setUpdateHistory] = useState({})
    useEffect(() => {
        axios.get('https://secret-badlands-60025.herokuapp.com/history')
            .then(res => setHistory(res.data))
            .catch(err => console.log(err))
    }, [updateHistory])
    const handleUpdate = (e, h) => {
        setUpdateHistory(h)
    }
    const handleDelete = (e, id) => {
        axios.delete(`https://secret-badlands-60025.herokuapp.com/deleteHistory/${id}`)
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
            <h2>Manage history</h2>
            {updateHistory._id ? <AddHistory updateHistory={updateHistory} setUpdateHistory={setUpdateHistory} /> :
                <div className="row">

                    <ol className='mx-3 border p-3'>
                        {
                            history.map(h => <li className='mx-2 border-bottom p-3' key={h._id}>
                                {h.text.slice(0, 100)}
                                <div className="d-flex">
                                    <button onClick={(event) => handleUpdate(event, h)} className='mt-1 btn-success border-0 p-md-1'>update history</button>
                                    <button onClick={(e) => handleDelete(e, h._id)} className='ms-3 btn-danger border-0 p-md-1'>delete history</button>
                                </div>
                            </li>)
                        }
                    </ol>

                </div>}

        </div>
    );
};

export default ManageHistory;