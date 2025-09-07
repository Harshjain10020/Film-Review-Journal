import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyList = () => {
    const [myMovies, setMyMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to get the unique user ID from local storage
    const getUserId = () => {
        let userId = localStorage.getItem('userId');
        if (!userId) {
            userId = window.crypto.randomUUID();
            localStorage.setItem('userId', userId);
        }
        return userId;
    };

    useEffect(() => {
        const fetchMyList = async () => {
            const userId = getUserId();
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/personalList/${userId}`);
                setMyMovies(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch your movie list. Please check your backend server.");
                console.error("Error fetching personal list:", err);
                setLoading(false);
            }
        };

        fetchMyList();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-gray-400">Loading your movie diary...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">My Personal Movie Diary</h1>
            <p className="text-lg text-gray-400 mb-8">This is where you'll find all the movies you've added to your list.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {myMovies.length > 0 ? (
                    myMovies.map(entry => (
                        <div key={entry.imdbId} className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-transform transform hover:scale-105">
                            <Link to={`/movies/${entry.imdbId}`}>
                                <img src={entry.movie.poster} alt={entry.movie.title} className="w-full h-auto object-cover rounded-t-lg" />
                            </Link>
                            <div className="p-4">
                                <h2 className="text-lg font-semibold text-white truncate">{entry.movie.title}</h2>
                                <p className="text-sm text-gray-400 mt-1">{entry.movie.genres.join(', ')}</p>
                                <p className="text-gray-300 mt-4 leading-relaxed italic border-t border-gray-700 pt-4">{entry.personalNote}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center p-8">
                        <p className="text-xl text-gray-500">Your list is currently empty. Add some movies from the home page!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyList;
