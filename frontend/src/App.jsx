import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [audioSrc, setAudioSrc] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a PDF file!");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post("/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // Expect a binary response (audio file)
      });

      // Create an object URL for the audio file
      const audioUrl = URL.createObjectURL(new Blob([response.data], { type: "audio/mpeg" }));
      setAudioSrc(audioUrl); // Set the audio source for the player
      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
      alert("An error occurred while processing your file.");
    }
  };

  return (
    <div className="flex flex-col justify-center gap-20 items-center h-screen bg-gray-900 text-white">
      <h1 className="text-5xl text-white font-bold">PDF to Audio</h1>
      <form onSubmit={handleUpload} className="flex flex-col gap-4 items-center">
        <input   className="file-input file-input-bordered file-input-secondary w-full max-w-xs" type="file" accept="application/pdf" onChange={handleFileChange} />
        <button type="submit" className=" btn btn-outline btn-secondary">Convert to Audio</button>
      </form>
      {audioSrc && (
        <div className="flex flex-col items-center gap-4">
          <h3>Audio File:</h3>
          <audio controls src={audioSrc}></audio>
        </div>
      )}
      {loading && <p className="loading loading-spinner loading-lg"></p>}
    </div>
  );
}

export default App;
