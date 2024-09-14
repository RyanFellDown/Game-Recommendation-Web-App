import React, {useState} from 'react';
import SearchImage from './Images/searchImage.png'
import './CSS/Search.css';


function Search({setGamesData}) {
    const [input, setInput] = useState('')

    //Here, once the user submits a game, this function calls the Flask API, which runs the recommendation
    //program, and returns the JSON data in 'data', which is then sent to Games.js to use.
    const handleSubmit = async (event) => {
        event.preventDefault();

        //Data is calling the API here...
        const response = await fetch('http://127.0.0.1:8080/api/process-input/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({input}),
        })

        //...and the data is returned and used here.
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setGamesData(data)
        })
        .catch(error => console.error('Error: ', error))
    }

    return (
        <div className = "search">
            <div className = "row">
                <div className = "Search-Middle">
                    <button id="searchButton" onClick={handleSubmit}>
                        <img src={SearchImage} id='searchIMG'></img>
                    </button>
                </div>
                <div className = "Search-Middle">
                    <form className='searchBar' onSubmit={handleSubmit}>
                        <input id='searchpart' className='searchInput' value={input} onChange={(x) => setInput(x.target.value)} type='text' placeholder='Search here...'>
                        </input>
                    </form>
                </div>
                <br />
                <div className = "Search-Middle">
                    <p></p>
                </div>
                <div className = "Search-Middle">
                    <p></p>
                </div>
            </div>
        </div>
  );
}

export default Search;