
from fastapi import FastAPI
from pydantic import BaseModel
import requests
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class ChatPayload(BaseModel):
    query: str

@app.post("/chat")
def chat(payload: ChatPayload):
    bearer_token = os.getenv("API_KEY")
    url = "https://genai.softnix.ai/external/api/chat-messages"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {bearer_token}"
    }
    data = {
        "query": payload.query,
        "inputs": {},
        "citation": True,
        "response_mode": "blocking"
    }
    response = requests.post(url, json=data, headers=headers, verify=False)
    return response.json()
