import React from 'react';

const ConfigPanel = ({ floorsCount, setFloorsCount, elevatorsCount, setElevatorsCount }) => (
  <div className="config">
    <div>
      <label htmlFor="floors">Number of Floors: </label>
      <input
        id="floors"
        type="number"
        value={floorsCount}
        onChange={(e) => setFloorsCount(Math.max(1, parseInt(e.target.value) || 1))}
        min="1"
      />
    </div>
    <div>
      <label htmlFor="elevators">Number of Elevators: </label>
      <input
        id="elevators"
        type="number"
        value={elevatorsCount}
        onChange={(e) => setElevatorsCount(Math.max(1, parseInt(e.target.value) || 1))}
        min="1"
      />
    </div>
  </div>
);

export default ConfigPanel;

/**
 * ConfigPanel Component
 *
 * This component shows two number inputs:
 * - One for selecting how many floors the building has
 * - One for selecting how many elevators to use
 *
 * The values are controlled by the parent component using state.
 * When the user changes the numbers, it updates the state in the parent.
 */