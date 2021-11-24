import React, { useState, useEffect } from 'react'
import axios from "./axios";

function Row( {title, fetchUrl} ) { //{title} = props.title
//state is like short-term memory. when we refresh it dissapears
 //state is the way to write variables in react

 const [movies, setMovies] = useState([]);

 // We need a snippet of code which run based on a specific condition/variable.
// can't use async things in a useEffect so you have to do it in a special way
 useEffect(() => {
    async function fetchData() {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
    }
    fetchData();
 }, [fetchUrl]); // if bracket is blank. run once when the row loads. and don't run it again.

    return (
        <div>
            <h2>{title}</h2>
            {/* cotainer -> posters */}
        </div>
    )
}

export default Row
