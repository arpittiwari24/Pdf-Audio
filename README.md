# Pdf-Audio

This project converts PDF files into audio files using a FastAPI backend and a React frontend.  It leverages text extraction from PDFs and text-to-speech capabilities to provide a convenient way to listen to PDF documents.

## Features and Functionality

* **PDF Upload:** Users can upload PDF files via a user-friendly web interface.
* **Text Extraction:** The backend extracts text content from the uploaded PDF using PyPDF2.
* **Text-to-Speech Conversion:**  The extracted text is converted into an audio file using `pyttsx3` (offline) for offline speech synthesis.
* **Audio Playback:** The generated audio file is streamed to the user's browser for immediate playback.
* **Error Handling:** Basic error handling is implemented to inform users of issues during file upload and processing.


## Technology Stack

* **Backend:** FastAPI (Python), PyPDF2, pyttsx3
* **Frontend:** React, Vite, Tailwind CSS (inferred from `index.html` and `App.jsx`)
* **Audio Processing:** `pyttsx3` for offline text-to-speech.

## Prerequisites

* **Python 3.7+:** Ensure Python 3.7 or higher is installed on your system.
* **Dependencies:**  Install the required Python packages using `pip`:
  ```bash
  pip install fastapi uvicorn PyPDF2 gtts pyttsx3 requests
  ```
* **Node.js and npm (or yarn):** Required for the frontend development.

## Installation Instructions

**Backend:**

1. Clone the repository:
   ```bash
   git clone https://github.com/arpittiwari24/Pdf-Audio.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd Pdf-Audio/backend
   ```
3. Install dependencies:  (This assumes you've already run the pip install command from the Prerequisites section)

**Frontend:**

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install  # or yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev  # or yarn dev
   ```

**Running the Application:**

1. In a separate terminal, navigate to the backend directory:
   ```bash
   cd ../backend
   ```
2. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

This will start the backend server. The frontend development server (from the previous step) should already be running.


## Usage Guide

1. Open your web browser and go to `http://localhost:5173/` (or the address your frontend server is running on).
2. Upload a PDF file by clicking the "Choose File" button.
3. Click "Convert to Audio" to initiate the conversion process.
4. Once the conversion is complete, the audio player will appear allowing you to listen to the audio.


## API Documentation

The API currently exposes the following endpoints:

* `/api/health`:  A simple health check endpoint returning `{"status": "healthy"}`.
* `/upload/`: Accepts a PDF file upload (multipart/form-data). Returns a streaming audio response (`audio/mpeg`).

## Contributing Guidelines

Contributions are welcome! Please open an issue to discuss proposed changes or create a pull request with your code changes.  Follow standard Git branching conventions.

## License Information

[Specify License here - Currently not specified in the repository]


## Contact/Support Information

For any questions or support requests, please open an issue on the GitHub repository.
