import React from 'react';

export default function Days() {
  const days = ['Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];

  return (
    <div className="card-action">
      {days.map((day, index) => (
        <a
          key={day}
          href="#"
          className={`day-link ${index === 0 ? 'active' : ''}`}
        >
          {day}
        </a>
      ))}
    </div>
  );
}