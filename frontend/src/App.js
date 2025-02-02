import React, { useState } from 'react';
import './App.css';

function App() {
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/recommend_books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genre, mood }), // Sending genre and mood
      });

      if (!response.ok) {
        throw new Error('Error fetching book recommendations');
      }
      const data = await response.json();
      setRecommendations(data);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Welcome to Book Recommender</h1>
      <h2>Book Recommendations</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>What genre do you prefer? (e.g., Fiction, Thriller)</label>
          <input
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>What mood are you in? (e.g., Happy, Sad)</label>
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
          />
        </div>
        <button type="submit">Get Recommendations</button>
      </form>
      {error && <p>{error}</p>}
      <h3>Recommended Books:</h3>
      <ul>
        {recommendations.map((book, index) => (
          <li key={index}>{book['Book-Title']} by {book['Book-Author']}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
