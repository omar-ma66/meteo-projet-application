/********************************************************************************* */
import React from 'react';
/********************************************************************************* */



export default function Days({ daysList, activeIndex, onSelectDay }) {
  // Helper pour afficher le nom du jour en français (ex: "lun.", "mar.")
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { weekday: 'short' });
  };

  return (
    <div className="card-action">
      {daysList.map((item, index) => (
        <a
          key={item.date}
          href="#"
          className={`day-link ${index === activeIndex ? 'active' : ''}`}
          onClick={(event) => {
            event.preventDefault();
            onSelectDay(index); // Met à jour l'état 'jour' dans Weather
          }}
        >
          {getDayName(item.date)}
        </a>
      ))}
    </div>
  );
}