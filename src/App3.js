import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [direction, setDirection] = useState('');
  const [speed, setSpeed] = useState('');
  const [delay, setDelay] = useState('');

  const handleClick = (dir) => {
    setDirection(dir);
    axios
      .post(`http://256finalprojectckm.local/control?direction=${dir}&speed=${speed}&delay=${delay}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const handleDelayChange = (event) => {
    setDelay(event.target.value);
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-auto">
          <h1>Crane Control</h1>
          <div className="btn-group-vertical" role="group">
            <button type="button" className="btn btn-primary" onClick={() => handleClick('down')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M7.5 2a.5.5 0 0 1 .5.5v8.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7 11.293V2.5a.5.5 0 0 1 .5-.5z" />
              </svg>
            </button>
            <button type="button" className="btn btn-primary" onClick={() => handleClick('up')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M7.5 14a.5.5 0 0 0 .5-.5V4.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 0 0 .708.708L7 4.707v8.793a.5.5 0 0 0 .5.5z" />
              </svg>
            </button>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter speed"
                value={speed}
                onChange={handleSpeedChange}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter delay"
                value={delay}
                onChange={handleDelayChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
