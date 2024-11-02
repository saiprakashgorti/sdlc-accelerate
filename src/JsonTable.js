// src/JsonTable.js
import React from "react";

const JsonTable = ({ data }) => {
  // Check if data is available and is an array
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>No data available</p>;
  }

  // Get the headers from the keys of the first object in the array
  const headers = Object.keys(data[0]);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header) => (
              <td key={`${rowIndex}-${header}`}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JsonTable;