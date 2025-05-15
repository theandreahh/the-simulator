
import React, { useState, useEffect } from 'react';
import './App.css';

import ConfigPanel from './components/ConfigPanel';
import FloorLabel from './components/FloorLabel';
import ElevatorShaft from './components/ElevatorShaft';
import StatusPanel from './components/StatusPanel';

import useElevatorSystem from './hooks/useElevatorSystem';
import { updateConfig } from './utils/api'; // ✅ Import updateConfig

function App() {
  const [floorsCount, setFloorsCount] = useState(7); // 0 to 7 => 8 floors
  const [elevatorsCount, setElevatorsCount] = useState(4);

  const {
    elevators,
    handleExternalRequest,
    handleInternalRequest,
  } = useElevatorSystem(floorsCount, elevatorsCount);

  const floors = Array.from({ length: floorsCount + 1 }, (_, i) => i); // [0, 1, ..., floorsCount]

 
useEffect(() => {
  const syncConfig = async () => {
    try {
      await updateConfig({ floorsCount, elevatorsCount });
      console.log('✅ Config synced with backend');
    } catch (err) {
      console.error('❌ Failed to sync config:', err);
    }
  };

  syncConfig();
}, [floorsCount, elevatorsCount]); // 👈 Syncs whenever either changes


  return (
    <div className="app">
      <header className="page-header">
        <div className="logo">Gestalt Lift Simulator</div>
      </header>

      <ConfigPanel
        floorsCount={floorsCount}
        setFloorsCount={setFloorsCount}
        elevatorsCount={elevatorsCount}
        setElevatorsCount={setElevatorsCount}
      />

      <div className="building">
        <FloorLabel
          floors={floors}
          handleExternalRequest={handleExternalRequest}
        />

        <ElevatorShaft
          elevators={elevators}
          floors={floors}
          handleInternalRequest={handleInternalRequest}
        />
      </div>

      <div className="status-wrapper">
        <StatusPanel />
      </div>
    </div>
  );
}

export default App;
