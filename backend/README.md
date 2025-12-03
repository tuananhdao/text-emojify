# Text Emojify Backend

Minimal FastAPI backend that converts text to emojis using Gemini 2.5 Flash Lite.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

3. Run the server:
```bash
uvicorn main:app --reload
```

## API

**POST /emojify**

Request:
```json
{"text": "I'm hungry"}
```

Response:
```json
{"emojis": "🍔😋🥡"}
```

