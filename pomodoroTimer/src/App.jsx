import { useState } from 'react';
import Clock from "../Clock";
import Task from "../TaskFrontEndCard"
function App() {
    const [backgroundColor, setBackgroundColor] = useState("#d4c5a8");
    return(
        <>
        <div className="dark-tan">
            <div style={{ 
                minHeight: "100vh", 
                backgroundColor: backgroundColor,
                width: "100%",
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            }}>
                <Clock setBackgroundColor={setBackgroundColor}/>
                <Task setBackgroundColor={setBackgroundColor}/>

            </div>    
        </div>
        </>
        
    );
}

export default App
