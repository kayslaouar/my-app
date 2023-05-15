import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
	const [from, setFrom] = useState('');
	const [to, setTo] = useState('');

	const handleClick = async () => {
		let [from_x, from_y] = from.split(',');
		let [to_x, to_y] = to.split(',');
		console.log(from_x, from_y);
		console.log(to_x, to_y);
		await axios
			.post(`http://projectfork.local/control?from_x=${from_x}&from_y=${from_y}&to_x=${to_x},&to_y=${to_y}`, {timeout: 1000})
			.then(response => {
				console.log(response.data);
				console.log("success");
			})
			.catch(error => {
				console.log(error);
			});
	};

	const handleFromChange = event => {
		setFrom(event.target.value);
	};

	const handleToChange = event => {
		setTo(event.target.value);
	};

	return (
		<div className="container">
			<div className="row justify-content-center align-items-center">
				<div className="col-auto">
					<h1>Chess</h1>
					<div className="btn-group-vertical" role="group">
						<div className="input-group">
							<input type="text" className="form-control" placeholder="Enter from" value={from} onChange={handleFromChange} />
						</div>
						<div className="input-group">
							<input type="text" className="form-control" placeholder="Enter to" value={to} onChange={handleToChange} />
						</div>
					</div>
					<button type="button" className="btn btn-primary" onClick={() => handleClick()}>
						submit
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
