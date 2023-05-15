import React, { useState } from 'react';
import './App.css';

function App() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [device, setDevice] = useState(null);
  const [characteristic, setCharacteristic] = useState(null);

  const handleClick = async () => {
    let [from_x, from_y] = from.split(',');
    let [to_x, to_y] = to.split(',');
    console.log(from_x, from_y);
    console.log(to_x, to_y);

    if (characteristic) {
      const data = new Uint8Array([from_x, from_y, to_x, to_y]);
      await characteristic.writeValue(data);
      console.log('Data sent to Arduino');
    } else {
      console.log('Bluetooth characteristic not available');
    }
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
  };

  const handleToChange = (event) => {
    setTo(event.target.value);
  };

  const connectToDevice = async () => {
    try {
      const options = { filters: [{ name: 'Arduino' }] };
      const device = await navigator.bluetooth.requestDevice(options);
      setDevice(device);
      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('0000180a-0000-1000-8000-00805f9b34fb');
      const characteristic = await service.getCharacteristic('00002a37-0000-1000-8000-00805f9b34fb');
      setCharacteristic(characteristic);
      console.log('Connected to Arduino');
    } catch (error) {
      console.log('Bluetooth connection error:', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-auto">
          <h1>Chess</h1>
          <div className="btn-group-vertical" role="group">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter from"
                value={from}
                onChange={handleFromChange}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Enter to"
                value={to}
                onChange={handleToChange}
              />
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={connectToDevice}>
            Connect
          </button>
          <button type="button" className="btn btn-primary" onClick={handleClick} disabled={!characteristic}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
