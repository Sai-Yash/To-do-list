import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPen,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import "./App.css";

function App() {
  // Tasks (todo list) state - main state storing todo lists or tasks

  const [toDo, setToDO] = useState([
    { id: 1, title: "task 1", status: false },
    { id: 2, title: "task 2", status: false },
  ]);

  // temperoray state - when we use inputs to add a new task or update the task.
  // newTask will be used to hold temporay data that will be added as new tasks list.
  const [newTask, setNewTask] = useState("");

  // updateData will hold the task that is being edited.
  const [updateData, setUpdateData] = useState("");

  // Add task - fn to add task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDO([...toDo, newEntry]);
      setNewTask("");
    }
  };

  //  Delete task - this task will need an id to identify the task to be deleted.
  const deleteTask = (id) => {
    let newTaskz = toDo.filter((task) => task.id !== id);
    setToDO(newTaskz);
  };

  // mark tasks as done or completed
  const markDone = (id) => {
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return ({ ...task, status: !task.status });
      }
      return task;
    });
    setToDO(newTask);
  };

  // cancel update
  const cancelUpdate = () => {
    setUpdateData('')
  };

  // change or edit task for update
  const changeTasks = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  };

  // update task - button
  const updateTask = () => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
    let updatedObject = [...filterRecords, updateData]
    setToDO(updatedObject);
    setUpdateData('')
  };

  return (
    <div className="container App">
      <br></br>
      <h3>To Do list app (reactjs)</h3>
      <br></br>

      {/* form to update tasks */}

      <div className="row">
        <div className="col">
          <input className="form-control form-control-lg" 
           type="" 
           value={updateData && updateData.title } 
           onChange={(e)=> changeTasks(e)}/>
        </div>

        <div className="col-auto">
          <button className="btn btn-lg btn-success mr-20"
           onClick={updateTask}>
           Update
          </button>

          <button className="btn btn-lg btn-warning">
            Cancel
          </button>
        </div>
      </div>

      <br/>

      {/* form to add task */}

      <div className="row">
        <div className="col">
          <input
            className="form-control form-control-lg"
            type=""
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>

        <div className="col-auto">
          <button className="btn btn-lg btn-success" onClick={addTask}>
            Add task
          </button>
        </div>
      </div>

      {/* displaying toDO */}
      {toDo && toDo.length ? "" : "No Tasks..."}

      {toDo &&
        toDo
          // .sort((a,b) => a.id > b.id ? 1 : -1)
          .map((task, index) => {
            return (
              // Doubt - what is react.fragment
              <React.Fragment key={task.id}>
                <div className="col taskBg">
                  <div className={task.status ? 'done' : ' '}>
                    <span className="taskNumber">{index + 1}</span>
                    <span className="taskText">{task.title}</span>
                  </div>

                  <div className="iconsWrap">
                    <span
                      title="Completed / Not Completed"
                      onClick={() => markDone(task.id)}
                    >
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </span>

                    {task.status ? null : (
                    <span title="Edit" 
                      onClick={ ()=> setUpdateData({
                      id: task.id,
                      title:task.title,
                      status:task.status ? true : false})}>
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                    )}

                    <span title="Delete" onClick={() => deleteTask(task.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </span>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
    </div>
  );
}

export default App;
