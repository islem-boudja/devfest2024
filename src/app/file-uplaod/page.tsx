"use client";
import React, { useState } from "react";
import Papa, { ParseResult } from "papaparse";

interface DataRow {
  [key: string]: string | number; // Adjust this based on the expected structure of your CSV
}

const CSVUploader: React.FC = () => {
  const [data, setData] = useState<DataRow[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse<DataRow>(file, {
        header: true, // Use first row as keys for data objects
        skipEmptyLines: true, // Ignore empty lines
        complete: (results: ParseResult<DataRow>) => {
          setData(results.data); // Save parsed data to state
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {data.length > 0 && (
        <div>
          <h3>Parsed Data:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CSVUploader;
