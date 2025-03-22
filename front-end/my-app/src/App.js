import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/data')
      .then(response => {
        console.log('Data fetched:', response.data);
        setTableData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>Example Table </h1>
      <p>This is an example of a data table.</p>

      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th rowSpan="2">Disability Category</th>
              <th rowSpan="2">Participants</th>
              <th rowSpan="2">Ballots Completed</th>
              <th rowSpan="2">Ballots Incomplete/Terminated</th>
              <th colSpan="2">Results</th>
            </tr>
            <tr>
              <th>Accuracy</th>
              <th>Time to complete</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                <td>{row.disabilityCategory}</td>
                <td>{row.participants}</td>
                <td>{row.ballotsCompleted}</td>
                <td>{row.ballotsIncomplete}</td>
                <td>
                  {Array.isArray(row.accuracy) ? (
                    row.accuracy.map((acc, i) => (
                      <div key={i}>{acc}</div>
                    ))
                  ) : (
                    <div>{row.accuracy}</div>
                  )}
                </td>
                <td>
                  {Array.isArray(row.timeToComplete) ? (
                    row.timeToComplete.map((time, i) => (
                      <div key={i}>{time}</div>
                    ))
                  ) : (
                    <div>{row.timeToComplete}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;