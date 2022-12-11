import React from 'react';

const MovieList = (props) => {
    const AddComponent = props.AddComponent;
    return (
        <>
            {props.movies.map((movie, index) => (
                <div className='image-container d-flex justify-content-start m-3'>
                    <img src={movie.Poster} alt='movie'></img>
                    <div onClick={()=>props.handleAddsClick(movie)} className='overlay d-flex aligh-items-center justify-content-center'>
                        <AddComponent />
                    </div>
                </div>
                ))}
        </>)
        
    };


export default MovieList;