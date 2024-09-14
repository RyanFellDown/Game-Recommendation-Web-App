import React from 'react';
import ProfilePic from './Images/profilePic.png'
import tripleLine from './Images/TripleLine.png'
import './LibraryCSS/LibraryHeader.css';



function LibraryHeading() {

  return (
      <div className="LibraryRow">
        <div className="LibraryHeader-Left">
          <button id="LeftImage">
            <img src={tripleLine} id="tripleImage"/>
          </button>
        </div>
        <div className="LibraryHeader-Middle">
          <p>Library</p>
        </div>
        <div className="LibraryHeader-Middle" id="LibraryProfile">
          <a href="/">
            <button>
              <img src={ProfilePic} id="ProfileImage"/>
            </button>
          </a>
        </div>
      </div>
  );
}

export default LibraryHeading;


