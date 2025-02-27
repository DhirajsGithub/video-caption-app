import { useEffect, useRef } from 'react';
import { useAppContext } from '../context/AppContext';

export const useVideoTime = () => {
  const { state, setCurrentTime } = useAppContext();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { isPlaying } = state;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [setCurrentTime]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch((error) => {
        console.error('Error playing video:', error);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  return { videoRef };
};