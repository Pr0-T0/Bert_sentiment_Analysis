# Sentiment Analysis Web App

This project is a simple Sentiment Analysis Web Application that uses a FastAPI backend and an HTML, CSS, and JavaScript frontend. The backend leverages a pre-trained DistilBERT model to classify input text as positive or negative.

## Features
- Analyze sentiment (Positive/Negative) of input text.
- FastAPI backend with CORS enabled.
- Frontend built with HTML, CSS, and JavaScript to interact with the API.
- Uses Hugging Face's `distilbert-base-uncased-finetuned-sst-2-english` model for sentiment classification.
- Interactive character in the frontend that changes based on the sentiment response.

## Technologies Used
- **Backend:** FastAPI, Transformers (Hugging Face), PyTorch
- **Frontend:** HTML, CSS, JavaScript

## Installation & Setup
### Backend Setup
1. Clone this repository:
   ```sh
   git clone https://github.com/Pr0-T0/Bert_sentiment_Analysis.git
   cd Bert_sentiment_Analysis
   ```

2. Create a virtual environment (optional but recommended):
   ```sh
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

3. Install dependencies:
   ```sh
   pip install fastapi uvicorn torch transformers pydantic
   ```

4. Run the FastAPI server:
   ```sh
   uvicorn app:app --host 0.0.0.0 --port 8000
   ```

5. The API will be accessible at `http://localhost:8000`.

### Frontend Setup
1. Open the `index.html` file in a web browser.
2. Enter text into the input field and submit it to analyze sentiment.
3. Watch the interactive character change its expression based on the sentiment result.

## API Endpoints
- **POST `/sentiment`**: Accepts a JSON object with a `text` field and returns the sentiment analysis result.
  
  **Request Example:**
  ```json
  {
    "text": "I love this product!"
  }
  ```
  **Response Example:**
  ```json
  {
    "sentiment": "Positive"
  }
  ```

## Folder Structure
```
/
├── backend/
│   ├── app.py  # FastAPI server
├── frontend/
│   ├── index.html  # Frontend UI
│   ├── styles.css  # Styling
│   ├── script.js  # Handles API calls and character animations
```

## Future Improvements
- Improve UI/UX with a better design.
- Deploy the app online.
- Extend model capabilities for more sentiment categories.
- Enhance the character animations for more emotional expressions.
