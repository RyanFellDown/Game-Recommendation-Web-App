import React from 'react';
import './CSS/Header.css';


function Heading() {

  return (
    <div className="Header-Div">
      <div className="Row">
        <div className="Header-Middle">
          <button/>
        </div>
        <div className="Header-Middle">
          <p>Game Recommendation App</p>
        </div>
        <div className="Header-Middle" id="Profile">
          <a href="/library"><button /></a>
        </div>
      </div>
    </div>
  );
}

export default Heading;


