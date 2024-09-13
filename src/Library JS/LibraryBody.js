import React from 'react';
import './LibraryCSS/LibraryBody.css';
import SavedGames from './SavedGames';


function LibraryBodyComponent() {
  return (
    <div className="Body-Div">
      <div className="row">
        <div className='Column left'>
          <p></p>
        </div>
        <div className='Column middle'>
          <SavedGames/>
        </div>
        <div className='Column right'>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default LibraryBodyComponent;