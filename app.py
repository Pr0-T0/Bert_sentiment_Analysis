from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

app = FastAPI()

app.mount("/static", StaticFiles(directory="frontend", html=True), name="static");

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin (change in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load tokenizer and model
tokenizer = AutoTokenizer.from_pretrained("distilbert/distilbert-base-uncased-finetuned-sst-2-english")
model = AutoModelForSequenceClassification.from_pretrained("distilbert/distilbert-base-uncased-finetuned-sst-2-english")

def get_sentiment(text: str):
    # Tokenize input text
    inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True, max_length=512)

    # Run the text through the model
    with torch.no_grad():
        outputs = model(**inputs)

    # Convert logits to probabilities
    logits = outputs.logits
    probabilities = torch.nn.functional.softmax(logits, dim=-1)

    # Get predicted sentiment
    labels = ["Negative", "Positive"]
    sentiment = labels[torch.argmax(probabilities)]

    return sentiment

class TextInput(BaseModel):
    text: str

@app.post("/sentiment")
def sentiment_analysis(input: TextInput):
    sentiment = get_sentiment(input.text)
    return {"sentiment": sentiment}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
