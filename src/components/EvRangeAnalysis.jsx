// src/components/EvRangeAnalysis.js
import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EVRangeAnalysis = ({ data }) => {
  const rangeData = useMemo(() => {
    const validData = data.filter(vehicle => 
      typeof vehicle['Electric Range'] === 'number' && 
      vehicle['Electric Range'] > 0 &&
      typeof vehicle['Model Year'] === 'number'
    );
    
    const yearRangeMap = {};
    
    validData.forEach(vehicle => {
      const year = vehicle['Model Year'];
      const range = vehicle['Electric Range'];
      
      if (!yearRangeMap[year]) {
        yearRangeMap[year] = { totalRange: 0, count: 0, ranges: [] };
      }
      
      yearRangeMap[year].totalRange += range;
      yearRangeMap[year].count += 1;
      yearRangeMap[year].ranges.push(range);
    });
    
    const scatterData = [];
    
    Object.entries(yearRangeMap).forEach(([year, data]) => {
      const avgRange = data.totalRange / data.count;
      const minRange = Math.min(...data.ranges);
      const maxRange = Math.max(...data.ranges);
      
      scatterData.push({
        year: Number(year),
        avgRange: Math.round(avgRange),
        minRange,
        maxRange,
        count: data.count
      });
    });
    
    return scatterData.sort((a, b) => a.year - b.year);
  }, [data]);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">EV Range Analysis by Model Year</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 5,
              bottom: 20,
              left: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="year" name="Model Year" fontSize={12} />
            <YAxis type="number" dataKey="avgRange" name="Average Range (miles)" fontSize={12} />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name) => {
                if (name === 'avgRange') return [value, 'Average Range (miles)'];
                if (name === 'minRange') return [value, 'Min Range (miles)'];
                if (name === 'maxRange') return [value, 'Max Range (miles)'];
                return [value, name];
              }}
              labelFormatter={(year) => `Model Year: ${year}`}
            />
            <Legend />
            <Scatter name="Average Range" data={rangeData} fill="#10B981" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 text-xs text-gray-600">
        <p>Analysis of electric vehicle range by model year. This chart shows how EV range capabilities have evolved over time.</p>
      </div>
    </div>
  );
};

export default EVRangeAnalysis;