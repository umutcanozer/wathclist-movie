import React, { useEffect, useState }  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import Add from './components/Add';
import RemoveWatched from './components/RemoveWatched';
import DarkMode from './components/DarkMode';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [adds, setAdds] = useState([]);
  const [searchValue, setSearchValue] = useState('');


const getMovieRequest = async (searchValue) => {
  const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

  const response = await fetch(url);
  const responseJson = await response.json();

  if(responseJson.Search) {
    setMovies(responseJson.Search);
  }
  
};

useEffect(()=>{
  getMovieRequest(searchValue);
}, [searchValue]);

useEffect(()=>{
  const movieWatchlist = JSON.parse(
    localStorage.getItem('react-movie-app-watchlist')
    );

    setAdds(movieWatchlist);
}, []);

const saveToLocalStorage = (items) => {
  localStorage.setItem('react-movie-app-watchlist', JSON.stringify(items))
}

const addMovie = (movie) => {
  const newAddList = [...adds, movie];
  setAdds(newAddList);
  saveToLocalStorage(newAddList);
};

const removeMovie = (movie) => {
  const newAddList = adds.filter((add)=> add.imdbID !== movie.imdbID);
  setAdds(newAddList);
  saveToLocalStorage(newAddList);
};
return (
  <div className='container-fluid movie-app'>
     <div className='row d-flex alight-items-center mt-4 mb-4'>
      <MovieListHeading heading='Movies' />
      <DarkMode />
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
    
      
    </div>
    <div className='row swiper-wrapper'>
      <MovieList movies={movies} 
      handleAddsClick={addMovie} 
      AddComponent={Add} />
    </div>
    <div className='row d-flex alight-items-center mt-4 mb-4'>
      <MovieListHeading heading='Your WatchList' />
    </div>
    <div className='row'>
      <MovieList movies={adds} 
      handleAddsClick={removeMovie} 
      AddComponent={RemoveWatched} />
    </div>
  </div>
);
};

export default App;
