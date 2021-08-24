import React, {useState, useEffect} from "react";
import { Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios"
import './App.css';



function App() {

  const [task, setTask] = useState('');
  const [updateTask, setUpdateTask] = useState('');
  const [taskList, setTaskList] = useState([])
  useEffect(() => {
    Axios.get("http://alb-148907300.ap-south-1.elb.amazonaws.com/readtodo").then((response) => {
      console.log(response)
      setTaskList(response.data)
    })
    
  }, [updateTask,task,taskList])
  const addTask = () => {
    if(task !== ''){
      Axios.post("http://alb-148907300.ap-south-1.elb.amazonaws.com/createtodo",{description: task})
    }
  }
  const updateTAsk = (id) => {
   
      Axios.post("http://alb-148907300.ap-south-1.elb.amazonaws.com/updatetodo",{id: id, description: updateTask})
   
  }
  const deleteTask = (id) => {
   
    Axios.post("http://alb-148907300.ap-south-1.elb.amazonaws.com/deletetodo",{id: id})
 
}

  return (
    <div className="App">
      <div><p style = {{fontFamily:"Helvetica", fontSize:"35px"}}>Todo App</p></div>
      <label style = {{fontFamily:"Helvetica"}}>Task Description</label>
      <input type="text" style={{borderRadius:"20px", height:"30px", color: "white", background:"transparent"}} onChange={(event) => {setTask(event.target.value)}}/>
      <Button onClick={addTask} variant="outlined" style={{color: "lightgreen", borderColor: "lightgreen", textTransform: 'lowercase', borderRadius:"25px", marginBottom:"35px"}}>Add Task</Button>
        <div >
         {taskList.map((val,key) =>{
           return (
             
             <div key = {key} className="card"><p style = {{fontFamily:"Helvetica"}}>{val.task_description}</p>
           {/* <div>
            <input type="text" onChange={(event) => {setUpdateTask(event.target.value)}}/>
            <button onClick={update(val._id)}>updateTask</button>
           </div> */}
           
            <input type="text" placeholder="update task" onChange={(event) => {setUpdateTask(event.target.value)}} style={{borderRadius:"20px", height:"30px", color: "white", background:"transparent"}}></input>
            <Button onClick = {() => updateTAsk(val._id)} variant="contained" color="primary" style={{ textTransform: 'lowercase', borderRadius:"25px"}}> Update</Button>
            <Button onClick = {() => deleteTask(val._id)} variant="contained" color="secondary" style={{ textTransform: 'lowercase', borderRadius:"25px", marginLeft:"5px"}}> Delete</Button>
           </div>);
         })}
        </div>
    </div>
  );
}

export default App;
