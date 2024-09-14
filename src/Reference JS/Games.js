import React, {useState, useEffect} from 'react';
import PC from './Images/PCLogo.png';
import AddImage from './Images/AddButton.png'
import './CSS/Games.css';

function Games({gamesData}) {
    //The JSON data is sent as an input to this function from Search.js. We return 3 games, so we have the three
    //useStates, and to clean up the JSON data, we have the strings and Game variables.
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);

    console.log(gamesData)
    
    //This function doesn't update the HTML if no game data is input. If it is, the JSON game data is 
    //cleaned up and then the useStates data are set to each game's data. This is then mapped in the returned HTML.
    const fetchAPI = async() => {
        //If there's no input, then add nothing to the HTML.
        if(gamesData == null){
            setData1("No games searched...");
            setData2("No games searched...");
            setData3("No games searched...");
        }
        else{
            let Games = [];
            let updatedGames = [];
            
            //Push the game data from the API into the Games array.
            for (let key in gamesData.games){
                Games.push(gamesData.games[key]);
            }

            //We return up to three games and their data, cleaning it
            for (let x = 0; x<3; x++){
                Games[x] = Games[x].replace('[', '');
                Games[x] = Games[x].replace(/\\u/g, ' ');
                Games[x] = Games[x].replace(']', '');
                Games[x] = Games[x].replace(",", '');
                Games[x] = Games[x].split(/\s(?=")/);
                updatedGames.push(Games[x]);
            }

            setData1(updatedGames[0]);
            setData2(updatedGames[1]);
            setData3(updatedGames[2]);
        }
    };
     
    //The useEffect calls fetchAPI with gamesData in order to update once the user inputs a game.
    useEffect(() => {
      fetchAPI()
    }, [gamesData]);

    const handleLibrary = (gameInput) => {
        var alreadyAdded = false;
        for (var x = 0; x<localStorage.length; x++){
            let LSData = localStorage.getItem(localStorage.key(x));
            if(LSData == gameInput){
                console.log("Game is already added to Library!");
                alreadyAdded = true;
                break;
            }
        }
        //If the game hasn't been added to localStorage, add it and keep track of what indexes
        //have been used (will use this in SavedGames.js).
        if(!alreadyAdded){
            const orderedLS = JSON.parse(localStorage.getItem('order')) || [];
            const key = orderedLS.length > 0 ? Math.max(...orderedLS.map(Number)) + 1 : 0;
            
            orderedLS.push(String(key));
            localStorage.setItem('order', JSON.stringify(orderedLS));
            localStorage.setItem(key, gameInput);

            //setGames
            console.log("Added ", gameInput, " to library!");
        }
    }
    

  return (
    <div className = "games">
        <div className = "row-games">
            <div className = "Games-Middle">
                <img
                    src = {PC}
                    alt = ""
                />
            </div>
            <div className = "Games-Middle">
                {data1 != "No games searched..." &&
                    data1.map((game, index) => (
                        <>
                            <span key={index}>{game}</span>
                            <br></br>
                        </>
                    ))
                }
            </div>
            <div className = "Games-Middle">
                <div className = "Games-Button">
                    <button id="GamesButton" onClick = {() => handleLibrary(data1[0])}>
                        <img src={AddImage} id='GamesImage'></img>
                    </button>
                </div>
            </div>
        </div>
        <div className = "row-games">
            <div className = "Games-Middle">
                <img
                    src = {PC}
                    alt = ""
                />
            </div>
            <div className = "Games-Middle">
                <p>
                {data2 != "No games searched..." &&
                    data2.map((game, index) => (
                        <>
                            <span key={index}>{game}</span>
                            <br></br>
                        </>
                    ))
                }
                </p>
            </div>
            <div className = "Games-Middle">
                <div className = "Games-Button">
                    <button id="GamesButton" onClick = {() => handleLibrary(data2[0])}>
                        <img src={AddImage} id='GamesImage'></img>
                    </button>
                </div>
            </div>
        </div>
        <div className = "row-games">
            <div className = "Games-Middle">
                <img
                    src = {PC}
                    alt = ""
                />
            </div>
            <div className = "Games-Middle">
                <p>
                {data3 != "No games searched..." &&
                    data3.map((game, index) => (
                        <>
                            <span key={index}>{game}</span>
                            <br></br>
                        </>
                    ))
                }
                </p>
            </div>
            <div className = "Games-Middle">
                <div className = "Games-Button">
                    <button id="GamesButton" onClick = {() => handleLibrary(data3[0])} >
                        <img src={AddImage} id='GamesImage'></img>
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Games;