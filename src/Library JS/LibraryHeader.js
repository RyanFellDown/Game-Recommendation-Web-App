import React from 'react';
import './LibraryCSS/Header.css';


function LibraryHeading() {

  return (
    <div className="Header-Div">
      <div className="LibraryRow">
        <div className="LibraryHeader-Left">
          <button/>
        </div>
        <div className="LibraryHeader-Middle">
          <p>Library</p>
        </div>
        <div className="LibraryHeader-Middle" id="LibraryProfile">
          <a href="/"><button /></a>
        </div>
      </div>
    </div>
  );
}

export default LibraryHeading;


