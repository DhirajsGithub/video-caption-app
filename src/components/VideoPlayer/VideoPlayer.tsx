import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { useVideoTime } from '../../hooks/useVideoTime';
import './VideoPlayer.css';

const VideoPlayer: React.FC = () => {
  const { state, setIsPlaying } = useAppContext();
  const { videoUrl, captions, currentTime, isPlaying } = state;
  const { videoRef } = useVideoTime();

  const activeCaption = captions.find(
    (caption) => currentTime >= caption.startTime && currentTime <= caption.endTime
  );

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = parseFloat(e.target.value);
      videoRef.current.currentTime = time;
    }
  };

  return (
    <div className="video-player-container">
      {videoUrl ? (
        <>
          <div className="video-wrapper">
            <video 
              ref={videoRef} 
              src={videoUrl} 
              className="video-element" 
              onClick={handlePlayPause}
            />
            {activeCaption && (
              <div className="caption-overlay">
                {activeCaption.text}
              </div>
            )}
          </div>
          <div className="video-controls">
            <button 
              className="play-pause-button" 
              onClick={handlePlayPause}
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            {videoRef.current && (
              <input
                type="range"
                min="0"
                max={videoRef.current.duration || 0}
                step="0.1"
                value={currentTime}
                onChange={handleSeek}
                className="seek-slider"
              />
            )}
            <span className="time-display">
              {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </>
      ) : (
        <div className="no-video-message">
          Enter a video URL to get started
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;