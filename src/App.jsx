import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [startTime, setStartTime] = useState(null);
  const [isRunnning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  //effect to start the clock
  useEffect(() => {
    let intervalID;
    if (isRunnning) {
      intervalID = setInterval(() => {
        setTime(Date.now() - startTime + time);
      }, 100);
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [isRunnning]);

  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

  function convertMsToTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000) % 60;
    const minutes = Math.floor(milliseconds / 60000) % 60;
    const hours = Math.floor(milliseconds / 3600000);

    return `${padTo2Digits(hours)} : ${padTo2Digits(minutes)} : ${padTo2Digits(seconds)}.${milliseconds
      .toString()
      .slice(-3)}`;
  }

  function handlePlayPause() {
    // continue and pause logic
    if (!isRunnning) {
      //play
      setStartTime(Date.now());
    } else {
      //pause
    }
    //toggle status
    setIsRunning(!isRunnning);
  }

  function handleReset() {
    // reset clock
    setTime(0);
    // rest laps
    setLaps([]);
    //reset status
    setIsRunning(false);
  }

  function handleAddLap() {
    if (isRunnning) setLaps([...laps, convertMsToTime(time)]);
  }

  return (
    <>
      <div className='container'>
        <p>{convertMsToTime(time)}</p>
        <button onClick={handlePlayPause}>{isRunnning ? 'pause' : 'play'}</button>
        <button onClick={handleAddLap}>add lap</button>
        <button onClick={handleReset}>reset</button>
        <ol>
          {laps.map((lap, index) => (
            <li key={index}>{lap}</li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default App;
