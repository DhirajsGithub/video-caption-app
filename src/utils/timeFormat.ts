export const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    const milliseconds = Math.floor((timeInSeconds % 1) * 1000);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };
  
  export const parseTimeString = (timeString: string): number => {
    const match = timeString.match(/^(\d+):(\d+)(?:\.(\d+))?$/);
    
    if (!match) {
      return 0;
    }
    
    const [_, minutes, seconds, milliseconds = '0'] = match;
    return (
      parseInt(minutes) * 60 + 
      parseInt(seconds) + 
      parseInt(milliseconds.padEnd(3, '0')) / 1000
    );
  };