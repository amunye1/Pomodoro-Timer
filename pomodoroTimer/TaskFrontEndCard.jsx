import React, {useState, useEffect} from "react";
import "./Task.css"
function TaskFrontEndCard({ setBackgroundColor }){
    const [showTask, setShowTask] = useState(false);
    const [mode, setMode] = useState("pomodoro");
    const handleAddTaskClick = () => setShowTask(true);
    const handleCancelClick = () => setShowTask(false);
    const [pomodoroCount, setPomodoroCount] = useState(1)
    const [color, setColor] = useState("#ede7db")
    const [openNote, setOpenNote] = useState(true)
    const handleSaveClick =  () => {
        if(taskName.trim() !== ''){
            setTaskList(prev =>[
                ...prev,
                {name: taskName, pomodoros:pomodoroCount}
            ]);
            setTaskName('');
            setPomodoroCount(1);
            setShowTask(false);
        }
        //save logic goes here 
        setShowTask(false);
    };

    const [taskName, setTaskName] = useState('');
    const [taskList, setTaskList] = useState([]);

    const increment = () =>{
        setPomodoroCount(prevPomodoroCount => prevPomodoroCount +1)
    }

    const decrement = () =>{
        setPomodoroCount(prev => Math.max(1, prev - 1)); // Prevent going below 1
    }

     useEffect(() => {
        if (mode === "pomodoro") {
          setBackgroundColor("rgb(212 197 168)");
          setColor("rgba(255, 255, 255, 0.1)");
        } else if (mode === "shortBreak") {
          setBackgroundColor("rgb(57, 112, 151)");
          setColor("rgba(255, 255, 255, 0.1)");
        } else if (mode === "longBreak") {
          setBackgroundColor("rgb(56, 133, 138)");
          setColor("rgba(255, 255, 255, 0.1)");
        }
      }, [mode, setBackgroundColor]);

     
    return (
        <>

         {/* ✅ TASK CARDS: always shown */}
         {taskList.map((task, index) => (
          <div key={index} className="card task-card mt-2 p-2 mx-auto">
            <strong>{task.name}</strong>
            <p>Pomodoros: {task.pomodoros}</p>
          </div>
        ))}

        {/* 🧱 TASKBOX — always rendered */}
        <div
          className="taskBox container mx-auto"
          style={{
            backgroundColor: showTask ? "#f5f5f5" : "transparent",
            transition: "background-color 0.3s ease",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          {!showTask ? (
            <div className="row">
              <div className="col add-task">
                <button className="add-task-btn" onClick={handleAddTaskClick}>Add Task</button>
              </div>
            </div>
          ) : (
            <div className="col allItems">
              <div className="row mx-auto taskInputDiv">
                <input
                  className="taskInput"
                  placeholder="What are you working on?"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>
      
              <div className="row">
                <div className="row spanEstPomodoro">
                  <span>Est Pomodoros</span>
                </div>
                <div className="col">
                  <input
                    className="numberOfPomdoro"
                    type="number"
                    min="1"
                    value={pomodoroCount}
                    step="1"
                    onChange={(e) => setPomodoroCount(Number(e.target.value))}
                  />
                  <button onClick={increment}>Up Arrow</button>
                  <button onClick={decrement}>Down Arrow</button>
                </div>
              </div>
      
              <div className="row">
                <div className="col">
                {
                    openNote ? <button onClick={() => setOpenNote(false)}>+ Add Note</button>  :
                    <textarea rows ="10" cols="20"></textarea>
                  
                }
                  <button>+ Add Project</button>
                </div>
              </div>
            </div>
          )}
        </div>
      
        {/* ✅ FOOTER + TASK LIST — Only render footer if showTask */}
        {showTask && (
          <>
            <div
              className="footer container mx-auto"
              style={{
                backgroundColor: "#EFEFEF",
                marginTop: "-10px",
                padding: "14px 20px",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 -2px 5px rgba(0,0,0,0.05)",
              }}
            >
              <div className="col">
                <button>Delete</button>
                <button onClick={handleCancelClick}>Cancel</button>
                <button onClick={handleSaveClick}>Save</button>
              </div>
            </div>
          </>
        )}
      
       
      </>
      
    )}

export default TaskFrontEndCard;