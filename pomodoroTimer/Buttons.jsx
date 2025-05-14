function Buttons({mode,setMode}){
    return (
        <div className="btn-group" role="group">
          <div className="row justify-content-center">
            <div className="col-auto">
              <button className="mx-2" onClick={() => setMode("pomodoro")}>
                Pomodoro
              </button>
              <button className="mx-2" onClick={() => setMode("shortBreak")}>
                Short Break
              </button>
              <button className="mx-2" onClick={() => setMode("longBreak")}>
                Long Break
              </button>
            </div>
          </div>
        </div>
      );
}

export default Buttons 