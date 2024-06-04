import React, { useEffect, useState } from "react";
import "../movieList/movieList.css";
import Cards from "../card/card";

const TvShowList = () => {
    const [tvShowList, setTvShowList] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=e961aa01cb8c429dd1beb71109e6b7d2&language=en-US`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTvShowList(data.results);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error("Failed to fetch data:", error);
        }
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">POPULAR TV SHOWS</h2>
            {error ? (
                <div className="error">Error: {error}</div>
            ) : (
                <div className="list__cards">
                    {tvShowList.map((show) => (
                        <Cards key={show.id} movie={show} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TvShowList;
