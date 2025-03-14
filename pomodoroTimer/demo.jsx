function tlock() {
  async function twentyFiveMinuteClock() {
    let twentyFiveMinuteTotal = 1500;

    while (twentyFiveMinuteTotal > -1) {
      for (let seconds = 60; seconds > -1; seconds--) {
        await sleep(1000);
        if (seconds < 10) {
          return console.log(
            "THIS IS THE MINUTE " +
              twentyFiveMinuteTotal / 60 +
              ":" +
              "0" +
              seconds
          );
        } else {
          return console.log(
            "THIS IS THE MINUTE " + twentyFiveMinuteTotal / 60 + ":" + seconds
          );
        }
      }
      twentyFiveMinuteTotal = Math.floor(twentyFiveMinuteTotal - 60);
    }
  }

  return (
    <div>
      <p>{twentyFiveMinuteClock()}</p>
      <button id="Start25" onClick={twentyFiveMinuteClock()}>
        Start
      </button>
    </div>
  );
}

export default tlock;
