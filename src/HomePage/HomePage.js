import React, { useEffect, useState } from "react";
import axios from "../Requests/axios"; import "./HomePage.css"
import Nav from "../Nav/Nav";
import Row from "../Row/Row";
import requests from "../Requests/Requests";
import Loading from "../Loading/Loading";

export default function HomePage() {
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            const request = await axios.get(requests.fetchNetflixOrginals)
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            setLoading(false)
            return request
        }
        fetchData()
    }, [])

    if (loading) {
        <Loading />
    }

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string
    }

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="homeScreen">
                    <Nav />

                    <header className="banner" style={{
                        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        width: "100%"
                    }}>
                        <div className="banner__contents">
                            <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
                            <div className="banner__buttons">
                                <button className="banner__button">Play</button>
                                <button className="banner__button">My list</button>
                            </div>
                            <h2 className="banner__description">
                                {truncate(movie?.overview, 140)}
                            </h2>
                        </div>
                    </header>

                    <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOrginals} isLargeRow />
                    <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
                    <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
                    <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                    <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
                    <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                    <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
                    <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
                </div>
            )}
        </>
    )
}