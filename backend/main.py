from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse, HTMLResponse , StreamingResponse
from fastapi.staticfiles import StaticFiles
from PyPDF2 import PdfReader
from fastapi.templating import Jinja2Templates
from fastapi.requests import Request
import os
from io import BytesIO
import pyttsx3

app = FastAPI()
app.mount("/assets", StaticFiles(directory="../frontend/dist/assets"), name="static")


@app.get('/api/health')
async def health():
    return { 'status': 'healthy' }

# Route to serve React index.html (for client-side routing)
@app.get("/{catchall:path}")
async def serve_react_app(catchall: str):
    return FileResponse("../frontend/dist/index.html")




def text_to_speech_offline(text):
    engine = pyttsx3.init()
    audio_buffer = BytesIO()
    engine.save_to_file(text, "temp_audio.mp3")
    engine.runAndWait()

    # Read the saved audio into memory
    with open("temp_audio.mp3", "rb") as f:
        audio_buffer.write(f.read())

    audio_buffer.seek(0)
    os.remove("temp_audio.mp3")  # Cleanup
    return audio_buffer

@app.post("/upload/")
async def upload_pdf(pdf: UploadFile = File(...)):
        pdf_path = f"temp_{pdf.filename}"
        with open(pdf_path, "wb") as f:
            f.write(await pdf.read())

        reader = PdfReader(pdf_path)
        text = "".join(page.extract_text() for page in reader.pages)
        
        print(text)

        audio_buffer = text_to_speech_offline(text)

        os.remove(pdf_path)  # Cleanup

        # Read the entire audio buffer into memory
        audio_content = audio_buffer.read()

        return StreamingResponse(
            BytesIO(audio_content),
            media_type="audio/mpeg",
            headers={"Content-Disposition": f"inline; filename={pdf.filename}.mp3"},
        )
