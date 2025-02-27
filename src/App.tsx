// src/App.tsx
import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import CaptionEditor from './components/CaptionEditor/CaptionEditor';
import CaptionTimeline from './components/CaptionTimeline/CaptionTimeline';
import { useAppContext } from './context/AppContext';
import './App.css';

const VideoSection: React.FC = () => {
  const { state, setVideoUrl } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  
  const handleVideoUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVideoUrl(inputValue);
  };

  return (
    <>
      <div className="url-input-container">
        <form onSubmit={handleVideoUrlSubmit}>
          <input
            type="url"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter video URL (e.g., MP4 file URL)"
            required
          />
          <button type="submit">Load Video</button>
        </form>
      </div>
      
      <div className="main-content">
        <VideoPlayer />
        
        <div className="caption-tools">
          <CaptionEditor />
          <CaptionTimeline />
        </div>
      </div>
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
          <p>Video Caption Editor &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    </AppProvider>
  );
};

export default App;