// src/components/EvMakerDistribution.js
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EVMakeDistribution = ({ data }) => {
  const [topN, setTopN] = useState(10);
  
  const makeDistribution = useMemo(() => {
    const makeCounts = {};
    
    data.forEach(vehicle => {
      const make = vehicle.Make;
      if (make) {
        makeCounts[make] = (makeCounts[make] || 0) + 1;
      }
    });
    
    const sortedMakes = Object.entries(makeCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, topN);
    
    return sortedMakes;
  }, [data, topN]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
        <h2 className="text-lg font-semibold">EV Make Distribution</h2>
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-600">Top</span>
          <select 
            value={topN} 
            onChange={(e) => setTopN(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
          <span className="text-sm text-gray-600">makes</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={makeDistribution}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip 
              formatter={(value) => [value.toLocaleString(), 'Vehicles']}
              labelFormatter={(name) => `Make: ${name}`}
            />
            <Legend />
            <Bar dataKey="count" name="Number of Vehicles" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 text-xs text-gray-600">
        <p>Distribution of electric vehicles by manufacturer. This chart shows the most popular EV makes in the dataset.</p>
      </div>
    </div>
  );
};

export default EVMakeDistribution;