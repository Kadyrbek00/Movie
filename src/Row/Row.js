import React, { useEffect, useState } from "react";
import "./Row.css"
import axios from "../Requests/axios";

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([[]])


    const base_url = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request
        }
        fetchData()
    }, [])

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map((movie) =>
                    ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                        <section key={movie.id}>
                            <img
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                                alt={movie.name} />
                            <p>{movie.title} {movie.name}</p>
                        </section>
                    )
                )}
            </div>
        </div>
    )
}

export default Row