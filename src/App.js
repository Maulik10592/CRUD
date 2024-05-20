import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import 'react-responsive-modal/styles.css';
import {PlusCircle, Edit, Trash2} from 'react-feather';
import {Link, useNavigate} from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const [columns, setColumns] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(()=> {
    axios.get("http://localhost:3030/employee")
    .then(res =>{
      setColumns(Object.keys(res.data[0]));
      setRecords(res.data);
    });
  },[]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Do you want to Delete?");
    if(confirmDelete){
        axios.delete("http://localhost:3030/employee/"+ id +"/")
        .then(res =>{
            alert("Data is deleted successfully..."); 
            const updatedRecords = records.filter(data => data.id !== id);
            setRecords(updatedRecords);
            navigate("/");
        }).catch(err => console.log(err));
    }
  }

  return (
    <div className="container">
      <div className='d-flex'>
        <h1>CRUD APP</h1>
      </div>
      <div className='toolbar'>
        <Link className='btn btn-p' to="/create">
          <PlusCircle size={16}></PlusCircle>
          <span>add</span>
        </Link>
      </div>
      <table className='table'>
        <thead>
          <tr>
            {
              columns.map((c,i)=> (
                <th key={i}>{c}</th>
              ))
            }
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            records.map((d,i)=> (
              <tr key={i}>
                <td data-th="Id">{d.id}</td>
                <td data-th="Name">{d.name}</td>
                <td data-th="Email">{d.email}</td>
                <td data-th="Role">{d.role}</td>
                <td data-th="Address">{d.address}</td>
                <td>
                  <Link className='btn' to={`/Edit/${d.id}`}>
                    <Edit size={16}></Edit>
                    <span>Edit</span>
                  </Link>
                  <button className='btn' onClick={(e)=>handleDelete(d.id)} >
                    <Trash2 size={16}></Trash2>
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default App;