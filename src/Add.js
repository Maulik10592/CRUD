import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Add() {
    const [inputData, setInputData] = useState({name:'',email:'',role:'',address:''});

    const navigate = useNavigate();

    const handleAdd = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3030/employee",inputData)
        .then(res =>{
            alert("Data is added successfully...");
            console.log(res);
            const autoId = res.data.id;
            
            console.log(res.data.id);
            navigate("/");
        }).catch(err => console.log(err));
    }

    return (
        <div className='d-flex'>
            <form className='form' onSubmit={handleAdd}>
                <div className='d-flex'>
                    <h1>Add</h1>
                </div>
                <div>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' name='name' className='form-control' value={inputData.name} onChange={(e) => setInputData({...inputData,'name': e.target.value})} required />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input type='email' name='email' className='form-control' value={inputData.email} onChange={(e) => setInputData({...inputData,'email': e.target.value})} required />
                </div>
                <div>
                    <label htmlFor='role'>Role:</label>
                    <input type='text' name='role' className='form-control' value={inputData.role} onChange={(e) => setInputData({...inputData,'role': e.target.value})} required />
                </div>
                <div>
                    <label htmlFor='address'>Address:</label>
                    <textarea name='address' className='form-control' cols={30} rows={5} value={inputData.address} onChange={(e) => setInputData({...inputData,'address': e.target.value})} required></textarea>
                </div>
                <button className='btn'>Submit</button>
            </form>        
        </div>
    )
}

export default Add;