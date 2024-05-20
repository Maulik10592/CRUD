import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function Edit() {
    const {id} = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:3030/employee/"+id)
        .then(res => setData(res.data))
        .catch(err => console.log(err))
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3030/employee/"+id, data)
        .then(res =>{
            alert("Data is updated successfully...");
            navigate("/");
        }).catch(err => console.log(err));
    }

    return (
        <div className='d-flex'>
            <form className='form' onSubmit={handleSubmit}>
                <div className='d-flex'>
                    <h1>Edit</h1>
                </div>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' name='name' className='form-control' value={data.name} onChange={(e) => setData({...data,'name': e.target.value})} />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' name='email' className='form-control' value={data.email} onChange={(e) => setData({...data,'email': e.target.value})} />
                </div>
                <div>
                    <label htmlFor='role'>Role:</label>
                    <input type='text' name='role' className='form-control' value={data.role} onChange={(e) => setData({...data,'role': e.target.value})} />
                </div>
                <div>
                    <label htmlFor='address'>Address:</label>
                    <textarea name='address' className='form-control' cols={30} rows={5} value={data.address} onChange={(e) => setData({...data,'address': e.target.value})}></textarea>
                </div>
                <button className='btn'>Update</button>
            </form>        
        </div>
    )
}

export default Edit;