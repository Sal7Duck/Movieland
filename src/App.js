import React, { useState, useEffect } from "react";
import './App.css';
import MovieCard from './MovieCard';

const API_URL = "http://www.omdbapi.com?apikey=fb2def2";

// const movie1 = {
//     "Title": "Spider-Man Title Reveal",
//     "Year": "2021",
//     "imdbID": "tt14122734",
//     "Type": "movie",
//     "Poster": "https://m.media-amazon.com/images/M/MV5BNjRjMmQ2NDQtNmI5NC00N2EwLTkwYWQtOTM2OGZjMmI5YmRjXkEyXkFqcGdeQXVyMTI0NTA1MDI3._V1_SX300.jpg"
// }

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Superman');
    }, []);

  return (
    <div className="app">
        <h1>MovieLand</h1>
        <div className="search">
            <input 
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img 
                src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
                alt={"search"}
                onClick={() => searchMovies(searchTerm)}
            />
        </div>
        {
            movies?.length>0
            ? (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )
        }
    </div>
  );
}

export default App;
