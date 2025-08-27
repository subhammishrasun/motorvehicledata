// src/components/FileUpload.js
import React, { useEffect } from 'react';
import Papa from 'papaparse';

const FileUpload = ({ onDataLoaded, onLoading, onError }) => {
  useEffect(() => {
    const loadCSVData = async () => {
      onLoading(true);
      
      try {
        // Fetch the CSV file from the public folder
        const response = await fetch('/Electric_Vehicle_Population_Data.csv');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const csvText = await response.text();
        
        // Parse the CSV data
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (results) => {
            if (results.errors.length > 0) {
              onError(`Error parsing CSV: ${results.errors[0].message}`);
            } else {
              onDataLoaded(results.data);
            }
          },
          error: (error) => {
            onError(`Error reading file: ${error.message}`);
          }
        });
      } catch (error) {
        onError(`Error fetching file: ${error.message}`);
      }
    };
    
    loadCSVData();
  }, [onDataLoaded, onLoading, onError]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">EV Data Source</h2>
      <div className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-8 bg-gray-50">
        <svg className="w-12 h-12 text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p className="text-gray-700 mb-2">Loaded from: <strong className="text-green-600">Electric_Vehicle_Population_Data.csv</strong></p>
        <p className="text-sm text-gray-500 text-center">This dashboard is using a pre-loaded EV population dataset.</p>
      </div>
    </div>
  );
};

export default FileUpload;







