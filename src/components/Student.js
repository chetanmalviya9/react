import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletedetail, addDetail } from './MasterSlice';
import { useNavigate } from "react-router-dom";

export default function Student() {
  const dispatch = useDispatch()
  const [rollNo, setRollNo] = useState();
  const [name, setName] = useState();
  const [branch, setBranch] = useState();
  const [year, setYear] = useState();
  const navigate = useNavigate();
  let data = useSelector(state => state.master.data);

  const editData = (index, data) => {
    data = JSON.parse(JSON.stringify(data));
    data.index = index;
    console.log(data);
    navigate("/edit", { state: { data: data } });
  }
  const deleteData = (index) => {
    dispatch(deletedetail(index));
  }
  const addData = () => {
    data = {
      rollNo: rollNo,
      name: name,
      branch: branch,
      year: year
    }
    dispatch(addDetail(data))
  }
  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
          <label>Roll No.:-</label>
          <input className='form-control' type="text" onChange={(e) => setRollNo(e.target.value)} />
        </div>
        <div className='col-md-6'>
          <label>Name:-</label>
          <input className='form-control' type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='col-md-6'>
          <label>Branch:-</label>
          <input className='form-control' type="text" onChange={(e) => setBranch(e.target.value)} />
        </div>
        <div className='col-md-6'>
          <label>Year:-</label>
          <input className='form-control' type="text" onChange={(e) => setYear(e.target.value)} />
        </div>
        <div className='col mt-3'>
          <button className='btn btn-success' onClick={addData}>Save</button>
        </div>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Roll no.</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Year</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => {
            return <tr>
              <td>{index + 1}</td>
              <td>{data.rollNo}</td>
              <td>{data.name}</td>
              <td>{data.branch}</td>
              <td>{data.year}</td>
              <td><button className='btn btn-warning' onClick={() => editData(index, data)}>Edit</button></td>
              <td><button className='btn btn-danger' onClick={() => deleteData(index)}>Delete</button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}
