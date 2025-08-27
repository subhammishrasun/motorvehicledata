// src/components/EvModelYear.js
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EVModelYear = ({ data }) => {
  const yearDistribution = useMemo(() => {
    const yearCounts = {};
    
    data.forEach(vehicle => {
      const year = vehicle['Model Year'];
      if (typeof year === 'number') {
        yearCounts[year] = (yearCounts[year] || 0) + 1;
      }
    });
    
    const sortedYears = Object.entries(yearCounts)
      .map(([year, count]) => ({ year: Number(year), count }))
      .sort((a, b) => a.year - b.year);
    
    return sortedYears;
  }, [data]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">EV Adoption by Model Year</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={yearDistribution}
            margin={{
              top: 5,
              right: 5,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" fontSize={12} />
            <YAxis fontSize={12} />
            <Tooltip 
              formatter={(value) => [value.toLocaleString(), 'Vehicles']}
              labelFormatter={(year) => `Year: ${year}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="count" 
              name="Number of Vehicles" 
              stroke="#3B82F6" 
              activeDot={{ r: 6 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 text-xs text-gray-600">
        <p>Growth of electric vehicles over time by model year. This chart shows the adoption trend of EVs.</p>
      </div>
    </div>
  );
};

export default EVModelYear;