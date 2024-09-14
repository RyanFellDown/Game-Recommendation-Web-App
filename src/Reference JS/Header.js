import React from 'react';
import ProfilePic from './Images/profilePic.png'
import tripleLine from './Images/TripleLine.png'
import './CSS/Header.css';


function Heading() {

  return (
      <div className="Row">
        <div className="Header-Middle">
          <button>
            <img src={tripleLine} id="tripleImage"/>
          </button>
        </div>
        <div className="Header-Middle">
          <p>Game Recommendation App</p>
        </div>
        <div className="Header-Middle" id="Profile">
          <a href="/library">
            <button>
              <img src={ProfilePic} id="ProfileImage"/>
            </button>
          </a>
        </div>
      </div>
  );
}

export default Heading;


