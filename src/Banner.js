import React, { useState, useEffect} from 'react';
import axios from "./axios";
import requests from './requests';
import "./Banner.css"

function Banner() {
    const [movie, setMovie] = useState([]); // responsible for whatever random movie gets selected at top

    useEffect(() => {
        async function fetchData () {
            const request = await axios.get(requests.fetchNetflixOriginals);
            // console.log(request.data.results); [...movie1, movie2, movie3]
            setMovie(
            request.data.results [
            Math.floor(Math.random() * request.data.results.length - 1)
            ]
            );
            return request;
        }
        fetchData();
    }, []); //want it to run only once - when the banner compoment loads

    console.log(movie);

    function truncate(str, n) { //n = number
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header
        className="banner"
        style={{
            backgroundSize: "cover",
            backgroundImage: `url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
            backgroundPosition: "center center",
        }}
        // ? means if movie is ever undefined, it won't crash
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                    {/* films that came through either gave a title OR name OR original name */}
                    {/* if movie title doesn't exist > name > original_name */}
                    {/* optional chaining and ors fix this */}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
        </header>
    )
}

export default Banner
