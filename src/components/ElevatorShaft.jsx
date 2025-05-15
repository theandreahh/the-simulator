import React from 'react';
import Elevator from './Elevator';

const ElevatorShaft = ({ elevators, floors, handleInternalRequest }) => (
  <div className="elevator-shafts">
    {elevators.map((elevator, index) => (
      <div
        key={elevator.id}
        className="elevator-column"
        style={{ height: `${(floors.length) * 60}px` }}
      >
        <Elevator
          elevator={elevator}
          index={index}
          floors={floors}
          handleInternalRequest={handleInternalRequest}
        />
      </div>
    ))}
  </div>
);

export default ElevatorShaft;


/**
 * ElevatorShaft Component
 *
 * This component creates one column for each elevator.
 * Inside each column, it places an Elevator component that:
 * - Moves up/down based on its current floor
 * - Shows internal floor buttons
 *
 * Props:
 * - elevators: an array of elevator objects (each with id, currentFloor, etc.)
 * - floors: an array of all floor numbers (used for button labels and height)
 * - handleInternalRequest: function that handles button presses inside the elevator
 */