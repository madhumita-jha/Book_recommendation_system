from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
import random
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

current_dir = os.path.dirname(os.path.abspath(__file__))
books = pd.read_csv(os.path.join(current_dir, 'data', 'books.csv'), low_memory=False)

# Function to analyze sentiment of the mood
def analyze_sentiment(mood):
    analysis = TextBlob(mood)
    return analysis.sentiment.polarity  # Returns a float between -1.0 and 1.0

# Function for recommending books based on user input
def recommend_books(genre=None, mood=None):
    sentiment_score = analyze_sentiment(mood) # Analyze sentiment
    print(f"Sentiment Score: {sentiment_score}")  
    
    # Basic logic to change recommendations based on sentiment
    if sentiment_score > 0.1:
        recommended_books = books[books['Book-Title'].str.contains("Happy|Joy|Adventure", case=False)].sample(n=5)
    else:
        recommended_books = books[books['Book-Title'].str.contains("Sad|Dramatic|Mystery", case=False)].sample(n=5)

    return recommended_books[['Book-Title', 'Book-Author']].to_dict(orient='records')

# Route for book recommendations based on user responses
@app.route('/recommend_books', methods=['POST'])
def recommend_books_route():
    data = request.json
    genre = data.get('genre')  # Expecting genre in the JSON body
    mood = data.get('mood')    # Expecting mood in the JSON body
    recommendations = recommend_books(genre, mood)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
