import React, {useState, useEffect} from "react";
import "./Task.css"
function TaskFrontEndCard(){
    const [showTask, setShowTask] = useState(false);

    const handleAddTaskClick = () => setShowTask(true);
    const handleCancelClick = () => setShowTask(false);
    const [pomodoroCount, setPomodoroCount] = useState(1)
    const handleSaveClick =  () => {
        //save logic goes here 
        setShowTask(false);
    }

    const increment = () =>{
        setPomodoroCount(prevPomodoroCount => prevPomodoroCount +1)
    }

    const decrement = () =>{
        setPomodoroCount(prev => Math.max(1, prev - 1)); // Prevent going below 1
    }
    return (
        <div className = "taskBox container mx-auto">
            {!showTask ?(<div className="row">
                <div className="col">
                    <button onClick={handleAddTaskClick}>Add Task</button>
                    
                </div>
            </div>
            ):(
            <div className="col allItems">
                <div className ="row mx-auto taskInputDiv">
                    <input className="taskInput" placeholder="What are you working on ?"></input>
                </div>
                <div className="row">
                    <div className ="row spanEstPomodoro">
                        <span>  Est Pomodoros</span>
                    </div>
                    <div className="col">
                        <input className ="numberOfPomdoro" type="number" min="1" value={pomodoroCount} step="1" 
                        onChange={(e) => setPomodoroCount(Number(e.target.value))}/>
                        <button onClick={increment}>Up Arrow</button>
                        <button onClick={decrement}>Down Arrow</button>
                    </div>
                </div>      
                <div className="row">
                    <div className="col">        
                        <button>+ Add Note</button>
                        <button> + Add Project</button>
                    </div>
                </div> 
                <div className="row">
                    <div className="col"> 
                        <button>Delete</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                        <button onClick={handleSaveClick}>Save</button>
                    </div>
                </div>
            </div>
            )}
                

        </div>
    );
}

export default TaskFrontEndCard;