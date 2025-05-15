import React from 'react';
//import './Elevator.css';

const Elevator = ({ elevator, index, handleInternalRequest, floors }) => (
  <div className="elevator-box" style={{ bottom: `${elevator.currentFloor * 60}px` }}>
    <div className="panel">
      {[...floors].reverse().map((floor) => (
        <button key={floor} onClick={() => handleInternalRequest(index, floor)}>
          {floor === 0 ? 'G' : floor}
        </button>
      ))}
    </div>
  </div>
);

export default Elevator;


/**
 * Elevator Component
 *
 * This component shows one elevator.
 * It includes buttons inside the elevator so a user can choose a floor to go to.
 *
 * Props:
 * - elevator: the elevator's current status (like which floor it's on)
 * - index: the elevator's number or position in the list
 * - handleInternalRequest: function to handle what happens when a floor button is clicked
 * - floors: list of all available floors
 */