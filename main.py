from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_groq import ChatGroq
from all_keys import groq_api_key
from pydantic import BaseModel

# Initialize FastAPI
app = FastAPI()

# CORS Middleware (Allows frontend to communicate with backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Groq LLM
llm = ChatGroq(
    model_name="llama-3.3-70b-versatile",
    temperature=0.7,
    groq_api_key=groq_api_key
)

# Pydantic model for chat request
class ChatRequest(BaseModel):
    message: str

# Chat API Endpoint
@app.post("/chat/")
def chat(request: ChatRequest):
    try:
        response = llm.invoke(request.message)
        return {"status": "success", "response": response.content}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# Run the server using:
# uvicorn main:app --reload
