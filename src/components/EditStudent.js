import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateDetail } from './MasterSlice';

export default function EditStudent() {

  const dispatch = useDispatch()
  const [rollNo, setRollNo] = useState();
  const [name, setName] = useState();
  const [branch, setBranch] = useState();
  const [year, setYear] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setRollNo(location.state.data.rollNo);
    setName(location.state.data.name);
    setBranch(location.state.data.branch);
    setYear(location.state.data.year);
  }, [])
  const updateData = (e) => {
    e.preventDefault();
    let index = location.state.data.index;
    console.log(index)
    let data = {
      index: index,
      rollNo: rollNo,
      name: name,
      branch: branch,
      year: year
    }
    dispatch(updateDetail(data));
    navigate("/");
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <label>Roll No.:-</label>
          <input className='form-control' defaultValue={location.state.data.rollNo} type="text" onChange={(e) => setRollNo(e.target.value)} />
        </div>
        <div className='col-md-6'>
          <label>Name:-</label>
          <input className='form-control' defaultValue={location.state.data.name} type="text" onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='col-md-6'>
          <label>Branch:-</label>
          <input className='form-control' defaultValue={location.state.data.branch} type="text" onChange={(e) => setBranch(e.target.value)} />
        </div>
        <div className='col-md-6'>
          <label>Year:-</label>
          <input className='form-control' defaultValue={location.state.data.year} type="text" onChange={(e) => setYear(e.target.value)} />
        </div>
        <div className='col mt-3'>
          <button className='btn btn-success' onClick={updateData}>Update</button>
        </div>
      </div>
    </div>
  )
}
