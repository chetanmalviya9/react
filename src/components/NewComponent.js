import {Component} from 'react'
import data from './data';
export default class NewComponent extends Component{
constructor(){
  super();
  this.state={
    studentData:data,
    branchList:['CS','IT','EC','Total'],
    yearList:['All',2019,2020,2021,2022,2023],
    selectBranch:'Total',
    selectYear:'All',
    name:'',
    branch:'',
    roll:'',
    year:'',
    per:'',
    warning:"",
    disable:true
  }
}
add=(e)=>{
  e.preventDefault();
  const obj={roll:this.state.roll*1,name:this.state.name,branch:this.state.branch,year:this.state.year,per:this.state.per}
  if(obj=='')
  alert('Pls fill all fild')
  else{
  this.setState({
    studentData:[...this.state.studentData,obj]
  })
}
}
branchChange=(e)=>{
  this.setState({
    selectBranch:e.target.value
  })
}
yearChange=(e)=>{
  this.setState({
    selectYear:e.target.value
  })
}
deletFilter=(index)=>{
  const con= window.confirm("Are u sure?")
  if(con==true){
    this.state.studentData.splice(index,1)
    this.setState({studentData:this.state.studentData});
    
  }
}
validation=()=>{
    let l = this.state.studentData.filter(student => {
      return student.roll == this.state.roll
    }).length;

    if (l)
      this.setState({
        warning: "*this roll no is already exist",
        disable: true
      })
    else
      this.setState({ warning: "", disable: false })
  }

render(){
  return<div className='container'>
    <div className='text-center bg-info'><h1>Student Record</h1></div>
    <form onSubmit={this.add}>
    {/* Row------------------- */}
  <div className='row mt-3'>
        <div className='col md-6'>
          <label>Name:</label>
          <input type='text' required className='form-control' onChange={(e)=>{this.setState({name:e.target.value})}}  />
        </div>
          <div className='col md-6'>
          <label>Roll No:</label>
            <input type='number' required className='form-control' onKeyUp={this.validation} onChange={(e)=>{
              
                this.setState({roll:e.target.value})
               
              }}  />
             <small style={{color:'red'}}>{this.state.warning}</small>
          </div>
  </div>
  {/* second row-------------------- */}
  <div className='row mt-3'>
    <div className='col md-6'>
      <label>Branch:</label>
      <select  className='form-control'value={this.state.branch} onChange={(e)=>{this.setState({branch:e.target.value})}}>{this.state.branchList.map((branch)=>{
        return<option>{branch}</option>
      })}

      </select>
    </div>
    <div className='col md-6'>
      <label>Year:</label>
      <input type='number' required className='form-control'  onChange={(e)=>{this.setState({year:e.target.value})}}/>
    </div>
  </div>

  <div className='row mt-3'>
        <div className='col md-6'>
          <label>Percentage:</label>
          <input type='text' required className='form-control' onChange={(e)=>{this.setState({per:e.target.value})}}  />
        </div>
        <div className='col md-6'>
          <label>Year</label>
          <select className='form-control' value={this.state.selectYear} onChange={this.yearChange}>
              {this.state.yearList.map((item) => {
                return (
                  <option value={item}>{item}</option>
                )
              })}
            </select>
        </div>
          
  </div>

  {/* third row---------------------------- */}
  <div className='row mt-3'>
    <div className='col md-6'>
      <button type='submit' disabled={this.state.disable} className='btn btn-success' onClick={this.add}>Add</button>
    </div>
    {/* //------------------------------------ */}
    <div className='col md-6'>
    {this.state.branchList.map((item) => {
              let len= item=="Total"?this.state.studentData.length:this.state.studentData.filter(student => student.branch == item).length
      
              return ( 

                <button className='btn btn-info mx-2' onClick={this.branchChange} value={item}>{item + ":"+len }</button>
              )
            })}

    </div>
  </div>
  </form>
  {/* four row------------------------------- */}
  <div className='row mt-5'>
    <table className='table-responsive table table-bordered'>
    <thead>
      <tr>
        <th>S.No.</th>
        <th>Name</th>
        <th>Roll</th>
        <th>Branch</th>
        <th>Year</th>
        <th>Percentage</th>
        <th>Remove </th>
      </tr>
    </thead>
    <tbody>
      {this.state.studentData.filter((record)=>record.branch==this.state.selectBranch||this.state.selectBranch=='Total')
      .filter(record=>record.year==this.state.selectYear||this.state.selectYear=='All').map((record,index)=>{
        return<tr>
          <td>{index+1}</td>
          <td>{record.name}</td>
          <td>{record.roll}</td>
          <td>{record.branch}</td>
          <td>{record.year}</td>
          <td>{record.per}</td>
          <button onClick={()=>{this.deletFilter(index)}} className='btn btn-outline-danger'>Remove</button>
        </tr>
      })}
      
    </tbody>
    </table>
  </div>
  </div>
}
}