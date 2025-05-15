import React from 'react';

const FloorLabel = ({ floors, handleExternalRequest }) => (
  <div className="floor-labels">
    {floors.map((floor) => (
      <div key={floor} className="floor-label-row">
        <span>{floor === 0 ? 'G' : floor}</span>
        <div className="external-buttons">
          {floor !== floors.length - 1 && (
            <button onClick={() => handleExternalRequest(floor, 'up')}>↑</button>
          )}
          {floor !== 0 && (
            <button onClick={() => handleExternalRequest(floor, 'down')}>↓</button>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default FloorLabel;


/**
 * FloorLabel Component
 *
 * This component shows the floor numbers and the up/down buttons outside the elevators.
 * Each floor (except the top and ground) has both ↑ and ↓ buttons.
 *
 * Props:
 * - floors: array of floor numbers (e.g., [0, 1, 2, 3, ...])
 * - handleExternalRequest: function to handle when a user presses the ↑ or ↓ button
 */