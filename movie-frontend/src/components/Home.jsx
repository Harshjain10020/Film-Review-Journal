import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const API_URL = "http://localhost:8080/api/v1/movies";

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(API_URL);
                setMovies(response.data);
            } catch (error) {
                console.error("There was an error fetching the movies!", error);
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className="bg-gray-950 min-h-screen text-white font-sans">
            <div className="container mx-auto p-8 md:p-12 lg:p-16">
                <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 text-white">Movie Collection</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.length > 0 ? (
                        movies.map(movie => (
                            <Link to={`/movies/${movie.imdbId}`} key={movie.imdbId}>
                                <div className="relative overflow-hidden rounded-lg shadow-xl group cursor-pointer transition-transform duration-300 hover:scale-105">
                                    <img src={movie.poster} alt={movie.title} className="w-full h-96 object-cover rounded-lg" />
                                    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h2 className="text-xl font-bold text-white mb-1">{movie.title}</h2>
                                        <p className="text-sm text-gray-400">{movie.genres.join(', ')}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-white p-10">
                            <h2 className="text-3xl font-bold">No movies to display.</h2>
                            <p className="mt-2 text-gray-400">Please check your backend connection.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
