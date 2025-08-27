// src/components/EvTypeDistribution.js
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const EVTypeDistribution = ({ data }) => {
  const typeDistribution = useMemo(() => {
    const typeCounts = {};
    
    data.forEach(vehicle => {
      const type = vehicle['Electric Vehicle Type'];
      if (type) {
        typeCounts[type] = (typeCounts[type] || 0) + 1;
      }
    });
    
    const total = Object.values(typeCounts).reduce((sum, count) => sum + count, 0);
    
    return Object.entries(typeCounts).map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / total) * 100)
    }));
  }, [data]);
  
  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B', '#EF4444'];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold mb-3">EV Type Distribution</h2>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={typeDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
              nameKey="name"
              label={({ name, percentage }) => `${name}: ${percentage}%`}
            >
              {typeDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value, name, props) => [
                `${value} vehicles (${props.payload.percentage}%)`, 
                name
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-3 text-xs text-gray-600">
        <p>Distribution of electric vehicle types. BEV (Battery Electric Vehicle) runs entirely on electricity, while PHEV (Plug-in Hybrid Electric Vehicle) has both electric and gasoline capabilities.</p>
      </div>
    </div>
  );
};

export default EVTypeDistribution;