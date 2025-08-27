// src/components/DataSummary.js
import React from 'react';

const DataSummary = ({ data }) => {
  // Add console log to debug
  console.log('DataSummary received data:', data);
  
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Data Summary</h2>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }
  
  // Calculate summary statistics
  const totalVehicles = data.length;
  const makes = [...new Set(data.map(item => item.Make))].length;
  const models = [...new Set(data.map(item => item.Model))].length;
  const counties = [...new Set(data.map(item => item.County))].length;
  
  // Calculate average electric range
  const validRanges = data.filter(item => typeof item['Electric Range'] === 'number' && item['Electric Range'] > 0);
  const avgRange = validRanges.length > 0 
    ? Math.round(validRanges.reduce((sum, item) => sum + item['Electric Range'], 0) / validRanges.length)
    : 0;
  
  // Get the most recent year in the dataset
  const years = data.map(item => item['Model Year']).filter(year => typeof year === 'number');
  const mostRecentYear = years.length > 0 ? Math.max(...years) : 'N/A';
  
  // Calculate BEV vs PHEV distribution
  const bevCount = data.filter(item => item['Electric Vehicle Type'] === 'Battery Electric Vehicle (BEV)').length;
  const phevCount = data.filter(item => item['Electric Vehicle Type'] === 'Plug-in Hybrid Electric Vehicle (PHEV)').length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Data Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-blue-800">Total Vehicles</h3>
          <p className="text-3xl font-bold text-blue-600">{totalVehicles.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-green-800">Vehicle Makes</h3>
          <p className="text-3xl font-bold text-green-600">{makes}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-purple-800">Average Range</h3>
          <p className="text-3xl font-bold text-purple-600">{avgRange} miles</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-yellow-800">Most Recent Year</h3>
          <p className="text-3xl font-bold text-yellow-600">{mostRecentYear}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-indigo-800">Vehicle Models</h3>
          <p className="text-3xl font-bold text-indigo-600">{models}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-red-800">Counties</h3>
          <p className="text-3xl font-bold text-red-600">{counties}</p>
        </div>
        <div className="bg-teal-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-teal-800">BEV / PHEV Ratio</h3>
          <p className="text-3xl font-bold text-teal-600">{bevCount} / {phevCount}</p>
        </div>
      </div>
    </div>
  );
};

export default DataSummary;