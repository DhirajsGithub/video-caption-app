import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { formatTime } from '../../utils/timeFormat';
import { Caption } from '../../types';
import './CaptionTimeline.css';

const CaptionTimeline: React.FC = () => {
  const { state, updateCaption, deleteCaption } = useAppContext();
  const { captions, currentTime } = state;
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Caption | null>(null);
  
  const handleEdit = (caption: Caption) => {
    setEditingId(caption.id);
    setEditForm({ ...caption });
  };
  
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm(null);
  };
  
  const handleSaveEdit = () => {
    if (editForm) {
      updateCaption(editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this caption?')) {
      deleteCaption(id);
    }
  };
  
  const handleJumpToTime = (time: number) => {
    const videoElement = document.querySelector('video');
    if (videoElement) {
      videoElement.currentTime = time;
    }
  };
  
  return (
    <div className="caption-timeline">
      <h2>Caption Timeline</h2>
      
      {captions.length === 0 ? (
        <div className="no-captions-message">
          No captions added yet. Add your first caption above.
        </div>
      ) : (
        <div className="caption-list">
          {captions.map((caption) => (
            <div 
              key={caption.id}
              className={`caption-item ${
                currentTime >= caption.startTime && currentTime <= caption.endTime
                  ? 'active'
                  : ''
              }`}
            >
              {editingId === caption.id ? (
                <div className="edit-caption-form">
                  <textarea
                    value={editForm?.text || ''}
                    onChange={(e) => 
                      setEditForm((prev) => prev ? { ...prev, text: e.target.value } : null)
                    }
                    className="edit-caption-text"
                  />
                  <div className="edit-caption-times">
                    <div className="edit-time-group">
                      <label>Start:</label>
                      <input
                        type="text"
                        value={formatTime(editForm?.startTime || 0)}
                        onChange={(e) => {
                          const time = e.target.value;
                          try {
                            const [min, sec] = time.split(':');
                            const totalSeconds = parseInt(min) * 60 + parseFloat(sec);
                            setEditForm((prev) => 
                              prev ? { ...prev, startTime: totalSeconds } : null
                            );
                          } catch (error) {
                            // Invalid format, ignore
                          }
                        }}
                      />
                    </div>
                    <div className="edit-time-group">
                      <label>End:</label>
                      <input
                        type="text"
                        value={formatTime(editForm?.endTime || 0)}
                        onChange={(e) => {
                          const time = e.target.value;
                          try {
                            const [min, sec] = time.split(':');
                            const totalSeconds = parseInt(min) * 60 + parseFloat(sec);
                            setEditForm((prev) => 
                              prev ? { ...prev, endTime: totalSeconds } : null
                            );
                          } catch (error) {
                            // Invalid format, ignore
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="edit-caption-actions">
                    <button onClick={handleSaveEdit} className="save-button">
                      Save
                    </button>
                    <button onClick={handleCancelEdit} className="cancel-button">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="caption-text">{caption.text}</div>
                  <div className="caption-times">
                    <button 
                      className="time-jump-button"
                      onClick={() => handleJumpToTime(caption.startTime)}
                    >
                      {formatTime(caption.startTime)}
                    </button>
                    <span>→</span>
                    <button 
                      className="time-jump-button"
                      onClick={() => handleJumpToTime(caption.endTime)}
                    >
                      {formatTime(caption.endTime)}
                    </button>
                  </div>
                  <div className="caption-actions">
                    <button 
                      onClick={() => handleEdit(caption)} 
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(caption.id)} 
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CaptionTimeline;