import axios from "axios"; // basically does what postman does

/** base url to make requests to the movie database */

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3"
});

// instance.get('/foo-bar'); = https://api.themoviedb.org/3/foo-bar

export default instance;
