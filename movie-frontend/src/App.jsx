import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Movie from './components/Movie';
import Header from './components/Header';
import MyList from './components/MyList';

// Placeholder for the personal movie diary component
// const MyList = () => {
//   return (
//     <div className="bg-gray-950 min-h-screen text-white p-8">
//       <h1 className="text-4xl font-bold">My Personal Movie Diary</h1>
//       <p className="mt-4 text-gray-400">This is where you'll see your saved movies and personal notes.</p>
//     </div>
//   );
// };

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies/:imdbId" element={<Movie />} />
          <Route path="/list" element={<MyList />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
