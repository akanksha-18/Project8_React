import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchGenres();
    }, []);

    const fetchGenres = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=e961aa01cb8c429dd1beb71109e6b7d2&language=en-US`);
            const data = await response.json();
            setGenres(data.genres);
        } catch (error) {
            console.error("Failed to fetch genres:", error);
        }
    };

    const handleGenreChange = (event) => {
        const selectedGenreId = event.target.value;
        navigate(`/movies/genre/${selectedGenreId}`);
    };

    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" src="https://mir-s3-cdn-cf.behance.net/projects/404/11136713.5480f729e54f9.jpg" alt="IMDB Logo" /></Link>
                <Link to="/movies/popular" style={{ textDecoration: "none" }}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{ textDecoration: "none" }}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{ textDecoration: "none" }}><span>Upcoming</span></Link>
                <Link to="/tv/popular" style={{ textDecoration: "none" }}><span>TV Shows</span></Link>
                <select className="genre-select" onChange={handleGenreChange} defaultValue="">
    <option value="" disabled>Genres</option>
    {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>{genre.name}</option>
    ))}
</select>
            </div>
        </div>
    );
};

export default Header;
