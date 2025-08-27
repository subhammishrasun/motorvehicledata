// src/components/CountryDistribution.js
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CountyDistribution = ({ data }) => {
  const [topN, setTopN] = useState(15);
  
  const countyDistribution = useMemo(() => {
    const countyCounts = {};
    
    data.forEach(vehicle => {
      const county = vehicle.County;
      if (county) {
        countyCounts[county] = (countyCounts[county] || 0) + 1;
      }
    });
    
    const sortedCounties = Object.entries(countyCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, topN);
    
    return sortedCounties;
  }, [data, topN]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
        <h2 className="text-lg font-semibold">EV Distribution by County</h2>
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-600">Top</span>
          <select 
            value={topN} 
            onChange={(e) => setTopN(Number(e.target.value))}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
          <span className="text-sm text-gray-600">counties</span>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={countyDistribution}
            layout="vertical"
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" fontSize={12} />
            <YAxis dataKey="name" type="category" width={80} fontSize={12} />
            <Tooltip 
              formatter={(value) => [value.toLocaleString(), 'Vehicles']}
              labelFormatter={(name) => `County: ${name}`}
            />
            <Legend />
            <Bar dataKey="count" name="Number of Vehicles" fill="#8B5CF6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 text-xs text-gray-600">
        <p>Distribution of electric vehicles by county. This chart shows which counties have the highest number of registered EVs.</p>
      </div>
    </div>
  );
};

export default CountyDistribution;