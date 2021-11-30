import React, { useState, useEffect } from 'react'
import axios from "./axios"; // which is actually instance
import "./Row.css"
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/"

function Row( {title, fetchUrl, isLargeRow} ) { //{title} = props.title
//state is like short-term memory. when we refresh it dissapears
 //state is the way to write variables in react

 const [movies, setMovies] = useState([]);
 const [trailerUrl, setTrailerUrl] = useState("");

 // We need a snippet of code which run based on a specific condition/variable.
// can't use async things in a useEffect so you have to do it in a special way
 useEffect(() => {
    async function fetchData() {
        const request = await axios.get(fetchUrl);
        //"https://api.themoviedb.org/3/fetchURLProp from app.js"
        //console.log(request);
        setMovies(request.data.results);
        return request;
    }
    fetchData();
 }, [fetchUrl]); // if bracket is blank. run once when the row loads. and don't run it again.

 //console.log(movies)

 //whenever you use anything with in a useEffect, if there is any variable that is pulled in
// from outside, that use inside the UE, you have to include it in the dependency array
// because it's dependant on that variable. everytime it changes you have to update your UE

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
        autoplay: 1
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl){
            setTrailerUrl('')
            // if the trailer is already open, then close it when you click
        } else {
            movieTrailer(movie?.name || "")
            .then ((url) => {
                //https://www.youtube.com/watch?v=xyzxyzxyz - we need the ?v=xyz part
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error))
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
            {movies.map(movie => (
                <img
                key={movie.id} // if anything changes in the row, react doesn't re-render the entire row, but only what it needs to
                //key also makes it slightly faster
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && "row__posterLarge"} `} // if it's a large row it gets an additional class called row__posterLarge
                src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name} />
            )) }
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            {/* when we have a trailerURL then show YouTube video */}
            {/* opts = options */}
        </div>
    )
}

export default Row
