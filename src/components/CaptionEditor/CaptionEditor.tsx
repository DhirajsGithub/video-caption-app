import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatTime, parseTimeString } from '../../utils/timeFormat';
import './CaptionEditor.css';

const CaptionEditor: React.FC = () => {
  const { state, addCaption } = useAppContext();
  const { currentTime } = state;
  
  const [captionText, setCaptionText] = useState('');
  const [startTime, setStartTime] = useState(formatTime(0));
  const [endTime, setEndTime] = useState(formatTime(0));
  
  const handleAddCaption = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!captionText.trim()) {
      alert('Please enter caption text');
      return;
    }
    
    const start = parseTimeString(startTime);
    const end = parseTimeString(endTime);
    
    if (start >= end) {
      alert('End time must be greater than start time');
      return;
    }
    
    addCaption({
      text: captionText,
      startTime: start,
      endTime: end,
    });
    
    // Reset form
    setCaptionText('');
    setStartTime(formatTime(currentTime));
    setEndTime(formatTime(currentTime + 5)); // Default 5 seconds duration
  };
  
  const handleSetCurrentAsStart = () => {
    setStartTime(formatTime(currentTime));
  };
  
  const handleSetCurrentAsEnd = () => {
    setEndTime(formatTime(currentTime));
  };
  
  return (
    <div className="caption-editor">
      <h2>Add New Caption</h2>
      <form onSubmit={handleAddCaption}>
        <div className="form-group">
          <label htmlFor="captionText">Caption Text</label>
          <textarea
            id="captionText"
            value={captionText}
            onChange={(e) => setCaptionText(e.target.value)}
            placeholder="Enter caption text..."
            rows={3}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="startTime">Start Time</label>
            <div className="time-input-group">
              <input
                id="startTime"
                type="text"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="MM:SS.MS"
                pattern="\d+:\d+(\.\d+)?"
                required
              />
              <button
                type="button"
                className="time-button"
                onClick={handleSetCurrentAsStart}
              >
                Set Current
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="endTime">End Time</label>
            <div className="time-input-group">
              <input
                id="endTime"
                type="text"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="MM:SS.MS"
                pattern="\d+:\d+(\.\d+)?"
                required
              />
              <button
                type="button"
                className="time-button"
                onClick={handleSetCurrentAsEnd}
              >
                Set Current
              </button>
            </div>
          </div>
        </div>
        
        <button type="submit" className="add-caption-button">
          Add Caption
        </button>
      </form>
    </div>
  );
};

export default CaptionEditor;