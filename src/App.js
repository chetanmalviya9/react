import './App.css';
// import Stopwatch from './components/Stopwatch';
// import Form from './components/Form';
// import Form1 from './components/Form1';
// import Form1 from './components/';
// import NewComponent from './components/NewComponent';
// import ToDoList from './components/ToDoList';
// import Student from './components/Student';
import { Route, Routes } from 'react-router-dom';
import EditStudent from './components/EditStudent';
import ChatBot from './components/ChatBot';


function App() {
  return (
    <div >
      <ChatBot/>
      {/* <ToDoList/> */}
      {/* <Form/> */}
      {/* <Form1/> */}
      {/* <Stopwatch/> */}
      {/* <NewComponent/> */}
      {/* <Routes>
        <Route path='/' element={<Student />} />
        <Route path='edit' element={<EditStudent />} />
      </Routes> */}
    </div>
  )
}

export default App;
