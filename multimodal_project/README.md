# NextGen Multimodal AI Platform

A cutting-edge multimodal web application that seamlessly integrates text, image, and audio processing with an innovative UI and fluid animations.

## Features

- **Unified Multimodal Interface**: Process and interact with text, images, and audio in a single, cohesive interface
- **Advanced Question Answering**: Get accurate answers powered by state-of-the-art LLMs
- **Multitask Learning**: Perform multiple AI tasks simultaneously
- **Image & Video Captioning**: Generate descriptive text for visual content
- **Website Referrals**: Automatic referrals to relevant websites based on context
- **Interactive Dialogue System**: Have natural conversations with visual and audio feedback
- **Cross-modal Translation**: Convert between text, speech, and visual information
- **LLM Integration**: Powered by Llama and other leading language models

## Getting Started

### Prerequisites

- Python 3.9+
- Node.js 18+
- CUDA-compatible GPU (recommended for optimal performance)

### Installation

1. Clone the repository
2. Install backend dependencies: `pip install -r requirements.txt`
3. Navigate to the frontend directory: `cd frontend`
4. Install frontend dependencies: `npm install`

### Running the Application

1. Start the backend server: `python -m src.app.main`
2. In a separate terminal, start the frontend: `cd frontend && npm run dev`
3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `src/`: Source code for backend services and ML models
- `frontend/`: Next.js web application
- `data/`: Data processing and management
- `configs/`: Configuration files
- `tests/`: Test suite
- `scripts/`: Utility scripts

## Data

- **Raw Data:** Found in `data/raw/` contains original images, audio, and a CSV.
- **Processing:** Preprocessed and split into training, validation, and test sets.
- **Notes:** Describe any augmentation or cleaning applied.
