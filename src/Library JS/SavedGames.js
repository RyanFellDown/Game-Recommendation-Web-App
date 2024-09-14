import React, { useState, useEffect } from 'react';
import './LibraryCSS/Saved.css';
import PCLogo from './Images/PCLogoTest.png'
import axios from 'axios';
import MinusImage from './Images/MinusButton.png'


//This component returns all the games the user has saved to localStorage to respective HTML elements,
//including the game name, steam search URL, image, and a button to remove the game.
function SavedGames() {
  const [gameData, setGameData] = useState([]);

  //This function calls a google API to search for images of our requested game and return the image URL for us to use.
  const fetchImage = async (game) => {
    try{
      //We make our API call to google, giving it our game name (formatted for URLs) and returning an image.
      const response = await axios.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyA8yVgNiwh3Mf7OCHvcrQPL4ocikLadk1Y&num=1&searchType=image&start=1&cx=74bd649225d0f43ba&exactTerms=${game}&fileType=.PNG&imgSize=medium&alt=json`)
      const data = response.data;
      const imageURL = data.items[0].link;

      console.log("The image URL is: ", imageURL);
      return imageURL;
    }
    catch(error){
      console.error("Couldn't retrieve the image...");
      return PCLogo;
    }
  }


  //Using a useEffect to continuously load data from local storage and outputing that as our library data.
  useEffect(() => {
    const fetchGames = async () => {
      var x = 0;
      const LSList = [];
      
      //Here, we sort all the games in localStorage into an array.
      while (x<localStorage.length){
        //We don't want 'order' variable from localStorage displayed, so we only add other variables.
        if(localStorage.key(x) !== 'order' && localStorage.getItem(localStorage.key(x)) !== 'N'){
          const gameName = localStorage.getItem(localStorage.key(x)).replace(/"/g, '');
          LSList.push([localStorage.key(x), gameName])
        }
        x = x+1;
      }
      //The sorted list is used to retrieve the games in numeric key order and therefore output them in order.
      LSList.sort();

      const gamePromise = LSList.map(async(LSGame, index) => {
        //Here, we set the game name, the data for our link/API call, and the key each game is associated with.
        const firstString = LSGame[1].toString();
        const plusGameName = firstString.replace(/ /g, "+");
        const linkData = `https://store.steampowered.com/search/?term=${plusGameName}`;

        //Fetch the image from the API: if it finds an image, it's stored, otherwise, default image.
        const imageURL = await fetchImage(plusGameName);
          
        //We then push the game name, image, URL, and key into an array, which is then used in setGameData.
        return {name: LSGame[1], image: imageURL, url: linkData, key: LSGame[0]};
      })

      //We set a variable to the returned array from the array mapping done in gamePromise, waiting for it to finish.
      const toSetGameData = await Promise.all(gamePromise);
      setGameData(toSetGameData);
    }

    fetchGames();
  }, []);

  //This function handles the removal of a game, makeing sure to setGameData equal to all games
  //except the game with the key we are removing.
  const handleRemove = (index) => {
    localStorage.removeItem(index);
    console.log("Removed game was: ", index);
    setGameData((prevGame) => prevGame.filter((game) => game.key !== index));
  }


  return (
    <div>
      {gameData.length > 0 ? (
        gameData.map((game, index) => (
          <div key={index} className='InnerLibrary'>
            <div className='LeftRow'>
              <img id="gameImage" src={game.image} onError={(x) => x.target.src = PCLogo} alt="No Image..."></img>
            </div>
            <a href={game.url} target="_blank" rel="noopener noreferrer" className='gameURLs'>
              {game.name}
            </a>
            <button id="removeGame" onClick = {() => handleRemove(game.key)}>
              <img src={MinusImage} id='MinusIMG'/>
            </button>
          </div>
        ))
      ) : (
        <div className='OuterLibrary'>
          <p>No games are added to your library!</p>
        </div>
      )}
    </div>
  );
}

export default SavedGames;