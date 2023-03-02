import React, { Component } from 'react'
import Data from "../Data";
export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      studentList: Data,
      yearList: ["All", 2019, 2020, 2021, 2022],
      branchList: ["All", "CS", "IT", "BCA", "BBA"],
      selectedYear: "All",
      selectedBranch: "All",
      rollNo: "",
      name: "",
      branch: "",
      year: "",
      invalidRollNo: "",
      disable: false
    }
  }

  yearChange = (e) => {
    this.setState({
      selectedYear: e.target.value
    })
  }
  branchChange = (e) => {
    this.setState({
      selectedBranch: e.target.value
    })
  }
  formBranchChange = (e) => {
    this.setState({
      branch: e.target.value
    })
  }
  save = (e) => {
    e.preventDefault();
    const arrObj = { rollNo: this.state.rollNo * 1, name: this.state.name, branch: this.state.branch, year: this.state.year * 1 }
    this.setState(
      {
        studentList: [...this.state.studentList, arrObj]
      }
    )
  }
  deleteData = (rollNo) => {
    if (window.confirm("Are you sure")) {
      let index = this.state.studentList.findIndex(student => student.rollNo == rollNo)
      this.state.studentList.splice(index, 1);
      this.setState({ studentList: this.state.studentList })
    }
  }

  rollNoCheck = () => {
    let len = this.state.studentList.filter(student => {
      return student.rollNo == this.state.rollNo
    }).length;
    console.log(len)

    if (len)
      this.setState({
        invalidRollNo: "*this roll no is already taken",
        disable: true
      })
    else
      this.setState({ invalidRollNo: "", disable: false })
  }

  render() {

    let tableData = this.state.studentList.filter(student => student.branch == this.state.selectedBranch || this.state.selectedBranch == "All")
      .filter(student => student.year == this.state.selectedYear || this.state.selectedYear == "All")
      .map((item, index) => {
        return (
          <tr>
            <td value={item}>{index + 1}</td>
            <td value={item}>{item.rollNo}</td>
            <td value={item}>{item.name}</td>
            <td value={item}>{item.branch}</td>
            <td value={item}>{item.year}</td>
            <td onClick={() => this.deleteData(item.rollNo)}><button className='btn btn-outline-danger'>Delete</button></td>
          </tr>
        )
      })

    return (<>
      <div className='container mt-4'>
        <form className="form-group">
          <div className='row'>

            <label className='form-control btn-danger text-center col-md-12'>Student details form</label>
            <div className='col-md-6 form-group'>
              <label> Name:</label>
              <input className='form-control' type="text" name="name" onChange={(e) => { this.setState({ name: e.target.value }) }} />
            </div>
            <div className='col-md-6 form-group'>
              <label>Roll-No:</label>
              <input className='form-control' type="text" name="rollNo" onKeyUp={this.rollNoCheck} onChange={(e) => { this.setState({ rollNo: e.target.value }) }} />
              <small style={{ color: "red" }}>{this.state.invalidRollNo}</small>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 form-group'>
              <label>branch:</label>
              <select className='form-control' value={this.state.branch} onChange={this.formBranchChange}>
                {this.state.branchList.map((item) => {
                  return (
                    <option value={item}>{item}</option>
                  )
                })}
              </select>
            </div>
            <div className='col-md-6 form-group'>
              <label>year:</label>
              <input className='form-control' type="text" onChange={(e) => { this.setState({ year: e.target.value }) }} />
            </div>
            <div className='col text-center'>
              <button className='col-md-3 btn btn-success' disabled={this.state.disable} onClick={this.save} > save</button>
            </div>
          </div>
        </form>
        <div className='row'>
          <div className='col-md-6 form-group'>
            {this.state.branchList.map((item) => {
              let len = item == "All" ? this.state.studentList.length : this.state.studentList.filter(student => student.branch == item).length

              return (

                <button className='btn btn-outline-info mr-2' onClick={this.branchChange} value={item}>{item + ":" + len}</button>
              )
            })}
          </div>
          <div className='col-md-6 form-group'>
            <small>Year Filter</small>
            <select className='form-control' value={this.state.selectedYear} onChange={this.yearChange}>
              {this.state.yearList.map((item) => {
                return (
                  <option value={item}>{item}</option>
                )
              })}
            </select>
          </div>
        </div>

        <div className='table-responsive'>
          <table className='table'>
            <thead>
              <tr>
                <th>S no.</th>
                <th>Roll no.</th>
                <th>Name</th>
                <th>Branch</th>
                <th>Year</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody> {tableData} </tbody>
          </table>
        </div>
      </div>
    </>
    )
  }
}