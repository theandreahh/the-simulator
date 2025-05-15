export const createInitialElevators = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      currentFloor: 0,
      targetFloors: [],
      direction: null,
      doorsOpen: false
    }));
  };
  
 const dingAudio = new Audio('/assets/ding.mp3'); // Vite serves from public/
dingAudio.load(); // Preload on app start

export const playDing = () => {
  dingAudio.currentTime = 0; // rewind to start for repeat
  dingAudio.volume = 1.0;

  dingAudio
    .play()
    .catch((err) => {
      console.warn('🔇 Ding sound blocked:', err.message);
    });
};
  