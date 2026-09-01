import React from 'react' ;


export default function Days()
{
 const days = ['Thurday','Friday','Saturday','Sunday','Monday'];
 
 return (
    <div className='card-action'>
        {days.map((day,index)=>(
            <a 
            key={day}
            href="#"
            style={{ fontWeight: index === 0 ? 'bold' : 'normal '}}
            >
                {day}
            </a>
        ))}
    </div>
 );
};
