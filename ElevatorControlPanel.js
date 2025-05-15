// src/ElevatorControlPanel.js
import React from 'react';
import './ElevatorControlPanel.css'; // Import the associated CSS

const ElevatorControlPanel = () => {
  return (
    <div className="control-panels">
      <div className="control-panel">
        <h3>Elevator 1</h3>
        <div className="floor-buttons">
          <button className="floor-button">7</button>
          <button className="floor-button">6</button>
          <button className="floor-button">5</button>
          <button className="floor-button">4</button>
          <button className="floor-button">3</button>
          <button className="floor-button">2</button>
          <button className="floor-button">1</button>
          <button className="floor-button">G</button>
        </div>
      </div>
      {/* Repeat the same structure for other elevators */}
    </div>
  );
};

export default ElevatorControlPanel;
