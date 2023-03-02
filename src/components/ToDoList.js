import React, { Component } from 'react'
import Data from './todolistData'

export default class ToDoList extends Component {
  constructor() {
    super();
    this.state = {
      taskData: Data,
      priority: ["High", "Medium", "Low"],
      selectedStatus: "active",
      status: "",
      taskTitle: "",
      taskDate: "",
      pid: ""
    }
  }

  changeStatus = (item) => {
    let index = this.state.taskData.findIndex(task => task == item)

    let status = this.state.taskData[index].status
    console.log(status)
    if (status == "active") {
      this.state.taskData[index].status = "deactivate"
      this.setState({
        taskData: [...this.state.taskData]
      })
    }
    else {
      this.state.taskData[index].status = "active"
      this.setState({
        taskData: [...this.state.taskData]
      })
    }
    console.log(this.state.taskData)
  }

  save=(e)=>{
    e.preventDefault()
    const task={title:this.state.taskTitle,date:this.state.taskDate,pid:this.state.pid,status:this.state.status}
    this.setState({
      taskData:[...this.state.taskData,task]
    })
  }

  priority = (e) => {
    let priority = e.target.value
    let pid = priority == "High" ? 1 : priority == "Medium" ? 2 : 3
    this.setState({ pid: pid })
    console.log(this.state.status)
  }
  render() {
    let tableData = this.state.taskData.filter(task => task.status == this.state.selectedStatus)
      .sort((a, b) => a.pid - b.pid).map((item, index) => {
        return (
          <tr style={{ backgroundColor:item.pid == 1 ?"red" : item.pid == 2 ? "lightgreen" : "grey"}}>
          {/* <tr className={item.pid == 1 ?"bg-danger" : item.pid == 2 ? "bg-secondary" : "bg-success"}> */}
            <td value={item}>{index + 1}</td>
            <td value={item}>{item.title}</td>
            <td value={item}>{item.date}</td>
            <td value={item}>{item.pid == 1 ? "High" : item.pid == 2 ? "Medium" : "Low"}</td>
            <td value={item.status}> <button className='btn btn-primary' onClick={() => this.changeStatus(item)}> {item.status == "active" ? "Deactive" : "active"} </button></td>
          </tr>
        )
      })
    // console.log(this.state.textData)
    return (
      <div className='container mt-2 '>
        <div className=' row'>
          <button className='btn btn-danger btn-block'> To-Do-List </button>
          <div className='col-md-6 col-lg-6'>
            <label>Enter task </label>
            <input type="text" className='form-control' onChange={(e) => { this.setState({ taskTitle: e.target.value }) }} />
          </div>
          <div className='col-md-6 col-lg-6'>
            <label>Enter Date </label>
            <input type="text" className='form-control' onChange={(e) => { this.setState({ taskDate: e.target.value }) }} />
          </div>

          <div className='col-md-6 col-lg-6'>
            <label>Select priority</label>
            <select onChange={this.priority} className='form-control'>
              <option >Select priority</option>
              {this.state.priority.map(priority => {
                return <option value={priority}>{priority}</option>
              })}
            </select>
          </div>
          <div className='col-md-6 col-lg-6'>
            <label>Status</label>
            <select onChange={(e) => this.setState({ status: e.target.value })} className='form-control'>

              <option value="active">Select Status</option>
              <option value="active">Active</option>
              <option value="deactive">Deactive</option>

            </select>
          </div>
          <div className='col text-center'>
          <button onClick={this.save} className='btn btn-success mt-3 mb-3 '> save</button>
          </div>
        </div>
        <div className='row mb-4'>
          <div className='col-md-2'>
            <button onClick={() => this.setState({ selectedStatus: "active" })} className=' btn btn-info'>Active : {this.state.taskData.filter(data=>data.status=="active").length}</button>
          </div>
          <div className='col-md-2'>
            <button onClick={() => this.setState({ selectedStatus: "deactivate" })} className=' btn btn-info'>Deactive : {this.state.taskData.filter(data=>data.status=="deactivate").length}</button>
          </div>
        </div>
        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Tasks</th>
                <th>Date</th>
                <th>Priority</th>
                <th>status</th>
              </tr>
            </thead>
            <tbody> {tableData} </tbody>
          </table>
        </div>
      </div>
    )
  }
}
