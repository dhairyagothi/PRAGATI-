import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { mockTrainData, mockStationData, mockConflictData } from './data/mockData';

function App() {
  const [trains, setTrains] = useState(mockTrainData);
  const [stations, setStations] = useState(mockStationData);
  const [conflicts, setConflicts] = useState(mockConflictData);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // Simulate train position updates
      setTrains(prevTrains => 
        prevTrains.map(train => ({
          ...train,
          currentPosition: train.currentPosition + (Math.random() - 0.5) * 2,
          delay: train.delay + (Math.random() - 0.5) * 1,
          speed: Math.max(0, train.speed + (Math.random() - 0.5) * 10)
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black dark">
      <Dashboard 
        trains={trains}
        stations={stations}
        conflicts={conflicts}
        currentTime={currentTime}
      />
    </div>
  );
}

export default App;