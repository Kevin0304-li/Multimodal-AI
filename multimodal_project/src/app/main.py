import os
import json
from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Optional, List, Dict, Any
import uvicorn
import logging

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)

# Create the FastAPI app
app = FastAPI(
    title="NextGen Multimodal AI Platform",
    description="A cutting-edge multimodal API that processes text, images, and audio",
    version="1.0.0",
)

# Add CORS middleware to allow cross-origin requests from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import the API routers - will create these next
from .routers import text, image, audio, multimodal

# Add routers to the app
app.include_router(text.router, prefix="/api/text", tags=["Text Processing"])
app.include_router(image.router, prefix="/api/image", tags=["Image Processing"])
app.include_router(audio.router, prefix="/api/audio", tags=["Audio Processing"])
app.include_router(multimodal.router, prefix="/api/multimodal", tags=["Multimodal Processing"])

@app.get("/")
async def root():
    """Root endpoint to check if the API is running."""
    return {
        "message": "NextGen Multimodal AI Platform API is running!",
        "version": "1.0.0",
        "status": "active",
        "documentation": "/docs",
    }

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}

if __name__ == "__main__":
    # Run the API server
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("src.app.main:app", host="0.0.0.0", port=port, reload=True) 