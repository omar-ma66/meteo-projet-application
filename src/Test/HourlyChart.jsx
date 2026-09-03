import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function HourlyChart({ hourlyData }) {
  // Formatage des données pour le graphique
  const formattedData = hourlyData.map((item) => {
    const time = new Date(item.time).getHours(); // Extrait l'heure (ex: 14)
    return {
      heure: `${time}h`,
      temp: Math.round(item.temp_c),
    };
  });

  return (
    <div style={{ width: '100%', height: 180, marginTop: '20px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <XAxis dataKey="heure" tick={{ fontSize: 12, fill: '#666' }} />
          <YAxis unit="°" tick={{ fontSize: 12, fill: '#666' }} domain={['dataMin - 2', 'dataMax + 2']} />
          <Tooltip 
            formatter={(value) => [`${value}°C`, 'Température']}
            labelFormatter={(label) => `Heure : ${label}`}
          />
          <Area 
            type="monotone" 
            dataKey="temp" 
            stroke="#ff7300" 
            fill="#ffe6d5" 
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}