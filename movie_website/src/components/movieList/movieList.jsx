
import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";

const MovieList = () => {
    const [movieList, setMovieList] = useState([]);
    const [error, setError] = useState(null);
    const { type, genreId } = useParams();

    useEffect(() => {
        getData();
    }, [type, genreId]);

    const getData = async () => {
        try {
            const genreQuery = genreId ? `&with_genres=${genreId}` : '';
            const typePath = type ? `movie/${type}` : "discover/movie";
            const response = await fetch(`https://api.themoviedb.org/3/${typePath}?api_key=e961aa01cb8c429dd1beb71109e6b7d2&language=en-US${genreQuery}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMovieList(data.results);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error("Failed to fetch data:", error);
        }
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            {error ? (
                <div className="error">Error: {error}</div>
            ) : (
                <div className="list__cards">
                    {movieList.map((movie) => (
                        <Cards key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MovieList;
