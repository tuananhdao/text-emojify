from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI(
    api_key=os.getenv("GEMINI_API_KEY"),
    base_url="https://generativelanguage.googleapis.com/v1beta/openai/"
)


class EmojifyRequest(BaseModel):
    text: str


class EmojifyResponse(BaseModel):
    emojis: str


@app.post("/emojify", response_model=EmojifyResponse)
async def emojify(request: EmojifyRequest):
    response = client.chat.completions.create(
        model="gemini-2.5-flash-lite",
        messages=[
            {
                "role": "system",
                "content": "You convert text to emojis. Respond ONLY with emojis that represent the meaning/feeling of the input. No text, just emojis."
            },
            {
                "role": "user", 
                "content": request.text
            }
        ]
    )
    return EmojifyResponse(emojis=response.choices[0].message.content.strip())

