import React, { useEffect, useState } from "react";
import axios from "../Requests/axios"; import "./HomePage.css"
import Nav from "../Nav/Nav";
import Row from "../Row/Row";
import requests from "../Requests/Requests";
import Loading from "../Loading/Loading";

export default function HomePage() {
    const [movie, setMovie] = useState([]);
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

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
                        <input
                            onChange={(e) => console.log(e.target.value)}
                            type="text"
                            placeholder="Search" />
                    </header>

                    <Row search={search} title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOrginals} isLargeRow />
                    <Row search={search} title="Trending Now" fetchUrl={requests.fetchTrending} />
                    <Row search={search} title="Top Rated" fetchUrl={requests.fetchTopRated} />
                    <Row search={search} title="Action Movies" fetchUrl={requests.fetchActionMovies} />
                    <Row search={search} title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
                    <Row search={search} title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
                    <Row search={search} title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
                    <Row search={search} title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
                </div>
            )}
        </>
    )
}