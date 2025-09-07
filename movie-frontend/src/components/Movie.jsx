import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Movie = () => {
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState('');
  const { imdbId } = useParams();

  // Function to get or create a unique user ID
  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = window.crypto.randomUUID();
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  useEffect(() => {
    const API_URL = "http://localhost:8080/api/v1/movies";
    const getMovieData = async () => {
      try {
        const response = await axios.get(`${API_URL}/${imdbId}`);
        const singleMovie = response.data;
        setMovie(singleMovie);
        if (singleMovie.reviewIds && Array.isArray(singleMovie.reviewIds)) {
          setReviews(singleMovie.reviewIds);
        } else {
          setReviews([]);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
    getMovieData();
  }, [imdbId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!reviewText.trim()) return;

    try {
      const response = await axios.post("http://localhost:8080/api/v1/reviews", {
        reviewBody: reviewText,
        imdbId: imdbId
      });

      if (response.status === 201) {
        const newReview = response.data;
        setReviews([...reviews, newReview]);
        setReviewText('');
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleAddToList = async () => {
    try {
      const userId = getUserId();
      const response = await axios.post("http://localhost:8080/api/v1/personalList", {
        userId: userId,
        imdbId: movie.imdbId,
        personalNote: reviewText // We'll use the review as the personal note for now
      });
      if (response.status === 201) {
        alert(`Added ${movie.title} to your personal list!`);
      }
    } catch (error) {
      console.error("Error adding to personal list:", error);
      alert("Failed to add to personal list.");
    }
  };

  return (
    <div className="bg-gray-950 min-h-screen text-gray-200 font-sans">
      {movie ? (
        <div className="relative">
          <div
            className="w-full h-screen bg-cover bg-center relative"
            style={{ backgroundImage: `url('${movie.backdrops[0]}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/70 to-transparent"></div>
            
            <div className="container mx-auto p-8 md:p-12 lg:p-16 relative z-10 flex flex-col justify-end h-full">
              <div className="max-w-xl space-y-4">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white">
                  {movie.title}
                </h1>
                <p className="text-lg font-medium text-gray-300">
                  {movie.genres.join(' • ')}
                </p>
                <p className="text-gray-400 leading-relaxed text-justify">
                  {movie.plot}
                </p>
                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={handleAddToList}
                    className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-indigo-700 transition-colors"
                  >
                    Add to My List
                  </button>
                  <a
                    href={movie.trailerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-700 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-600 transition-colors"
                  >
                    Watch Trailer
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="container mx-auto p-8 md:p-12 lg:p-16">
            <div className="w-full max-w-4xl mx-auto">
              <div className="mb-8">
                <h3 className="text-3xl font-bold text-white mb-4">Add a Review</h3>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                  <textarea
                    rows="4"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full bg-gray-800 text-gray-200 p-4 rounded-lg border-2 border-transparent focus:outline-none focus:border-indigo-500 transition-colors placeholder-gray-500"
                    placeholder="Write your review here..."
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus-ring-indigo-500"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-white mb-4">Reviews</h3>
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                      <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-md border border-gray-700">
                        <p className="text-gray-300 leading-relaxed">{review.body}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400">No reviews yet. Be the first to add one!</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-screen text-xl">
          Loading movie details...
        </div>
      )}
    </div>
  );
};

export default Movie;
