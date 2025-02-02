import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookRecommendations = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Make POST request to Flask backend
        axios.post('http://127.0.0.1:5000/recommend_books')
            .then(response => {
                setBooks(response.data);
            })
            .catch(error => {
                setError('Error fetching book recommendations');
            });
    }, []);

    return (
        <div>
            <h1>Book Recommendations</h1>
            {error && <p>{error}</p>}
            <ul>
                {books.map((book, index) => (
                    <li key={index}>
                        <strong>{book['Book-Title']}</strong> by {book['Book-Author']}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookRecommendations;
