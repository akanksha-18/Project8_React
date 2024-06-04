import React from "react";
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from './pages/home/Home';
 import MovieList from "./components/movieList/movieList";
import Movie from './pages/movieDetail/movie';
import TvShowList from "./components/TVShowList/TVShowList";

const App = () => {
    return (
      <div className="App">
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movies/popular" element={<MovieList />} />
                <Route path="/movies/top_rated" element={<MovieList />} />
                <Route path="/movies/upcoming" element={<MovieList />} />
                <Route path="/movies/genre/:genreId" element={<MovieList />} />
                <Route path="/tv/popular" element={<TvShowList />} />
                <Route path="/movie/:id" element={<Movie />} />
            </Routes>
        </Router>
        </div>
    );
};

export default App;
