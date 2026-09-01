import React from 'react' ;
import Days from '../Days/Days.jsx';


export default function Weather()
{

    return (
            <div className='row'>
                <div className='col s12 m6 push-m3'>
                    <div className='weather card blue-grey darken-1'>
                       <div className='card-content white-text'>
                            <span className='card-title'>Lyon</span>
                                <p>
                                    <img src='../../icons/sun.svg' alt='Soleil'/>  
                                </p>
                                <span className='temperature'>17°</span>
                                <div className='wind'>Vent 3km/h (360°)</div>
                       </div>
                       <Days/>
                    </div>
                </div>
            </div>
    )
}