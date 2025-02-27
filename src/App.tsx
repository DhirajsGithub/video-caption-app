// src/App.tsx
import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import CaptionEditor from './components/CaptionEditor/CaptionEditor';
import CaptionTimeline from './components/CaptionTimeline/CaptionTimeline';
import { useAppContext } from './context/AppContext';
import './App.css';

const SAMPLE_VIDEO_URL = "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";

const VideoSection: React.FC = () => {
  const { state, setVideoUrl } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  
  const handleVideoUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVideoUrl(inputValue);
  };

  const handleQuickStart = () => {
    setInputValue(SAMPLE_VIDEO_URL);
    setVideoUrl(SAMPLE_VIDEO_URL);
  };

  return (
    <>
      <div className="url-input-container">
        <form onSubmit={handleVideoUrlSubmit} className="input-form">
          <input
            type="url"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter video URL (e.g., MP4 file URL)"
            required
          />
          <button type="submit">Load Video</button>
          <button className="quick-start" onClick={handleQuickStart}>Quick Start</button>
        </form>
      </div>
      
      <div className="main-content">
        <VideoPlayer />
        <CaptionEditor />
      </div>
      <CaptionTimeline />
    </>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <div className="app-container">
        <header className="app-header">
          <h1>Video Caption Editor</h1>
          <p>Add and manage captions for your videos</p>
        </header>
        
        <VideoSection />
        
        <footer className="app-footer">
          <p>Video Caption Editor by Dhiraj &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </AppProvider>
  );
};

export default App;