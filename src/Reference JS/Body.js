import React, { useState } from 'react';
import './CSS/Body.css';
import Search from './Search.js';
import Games from './Games.js';


function BodyComponent() {
  //This is use to send game data from Search.js to Games.js to use.
  const [gamesData, setGamesData] = useState(null);

  return (
    <div className="Body-Div">
      <div className="row">
        <div className='Column left'>
          <p></p>
        </div>
        <div className='Column middle'>
          <Search setGamesData={setGamesData}/>
          <Games gamesData={gamesData}/>
        </div>
        <div className='Column right'>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default BodyComponent;