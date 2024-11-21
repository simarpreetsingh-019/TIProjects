// src/App.js
import React, { useState } from 'react';
import './App.css';
import blockchainImage from './blockchain.png';

// Utility function to generate SHA-256 hash using JavaScript's Crypto API
async function generateHash(index, previousHash, task, timestamp) {
  const data = ${index}${previousHash}${task}${timestamp};
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = async () => {
    if (newTask) {
      const timestamp = new Date().toISOString();
      const previousHash = tasks.length > 0 ? tasks[tasks.length - 1].hash : '0';
      const index = tasks.length;

      // Generate the hash using the generateHash function
      const hash = await generateHash(index, previousHash, newTask, timestamp);

      const newTaskEntry = {
        index,
        task: newTask,
        hash,
        previousHash,
        timestamp,
      };

      setTasks([...tasks, newTaskEntry]);
      setNewTask('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={blockchainImage} alt="Blockchain" className="App-logo" />
        <h1>Blockchain-Based Tracker</h1>
      </header>
      <main>
        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task"
            className="task-input"
          />
          <button onClick={addTask} className="add-button">Modify</button>
        </div>
        <div className="task-list">
          <h2>Tracker</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.index} className="task-item">
                <p className="task-title"><strong>Task {task.index}:</strong> {task.task}</p>
                <p><strong>Hash:</strong> {task.hash}</p>
                <p><strong>Previous Hash:</strong> {task.previousHash}</p>
                <p><strong>Timestamp:</strong> {task.timestamp}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;