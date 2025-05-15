import { useState, useEffect } from 'react';
import { createInitialElevators, playDing } from '../utils/elevatorUtils'; // Set up elevators and play sound
import { FLOOR_HEIGHT } from '../utils/constants'; // Used for elevator movement visualization (not used here directly)

/**
 * Custom Hook: useElevatorSystem
 * 
 * Manages the state and behavior of all elevators in the simulation.
 * Handles movement, direction, floor requests, and door status.
 */
export default function useElevatorSystem(floorsCount, elevatorsCount) {
  // Set initial state: a list of elevator objects
  const [elevators, setElevators] = useState(createInitialElevators(elevatorsCount));

  // When the number of elevators changes, reset the elevator state
  useEffect(() => {
    setElevators(createInitialElevators(elevatorsCount));
  }, [elevatorsCount]);

  // Runs the elevator movement logic every second
  useEffect(() => {
    const interval = setInterval(() => {
      setElevators((prevElevators) =>
        prevElevators.map((elevator) => {
          // If the elevator has no target floors, it becomes idle
          if (elevator.targetFloors.length === 0) {
            return { ...elevator, direction: null };
          }

          const nextFloor = elevator.targetFloors[0];

          // If the elevator is already on the target floor, open doors and remove that target
          if (elevator.currentFloor === nextFloor) {
            const newTargetFloors = [...elevator.targetFloors];
            newTargetFloors.shift(); // Remove the first target floor
            playDing(); // Play sound when arriving
            return {
              ...elevator,
              direction: newTargetFloors.length > 0 ? elevator.direction : null,
              targetFloors: newTargetFloors,
              doorsOpen: true,
            };
          }

          // Determine if the elevator should move up or down
          const newDirection = elevator.currentFloor < nextFloor ? 'up' : 'down';
          const newFloor = elevator.currentFloor + (newDirection === 'up' ? 1 : -1);
          const updatedTargets = [...elevator.targetFloors];

          // If the elevator just arrived at the target floor after moving
          if (newFloor === nextFloor) {
            updatedTargets.shift(); // Remove the floor from the queue
            playDing();
            return {
              ...elevator,
              currentFloor: newFloor,
              targetFloors: updatedTargets,
              direction: updatedTargets.length > 0 ? newDirection : null,
              doorsOpen: true,
            };
          }

          // Elevator is still moving toward the target floor
          return {
            ...elevator,
            currentFloor: newFloor,
            direction: newDirection,
            doorsOpen: false,
          };
        })
      );
    }, 1000); // Repeat every 1 second

    return () => clearInterval(interval); // Stop the timer when component unmounts
  }, []);

  /**
   * Handles when someone presses UP or DOWN on a floor (external request)
   */
  const handleExternalRequest = (floor, direction) => {
    let bestElevatorIndex = null;
    let minDistance = Infinity;

    // Find the best elevator for the request (idle or moving in the right direction)
    elevators.forEach((elevator, index) => {
      const isIdle = elevator.targetFloors.length === 0;
      const sameDir = elevator.direction === direction;
      const distance = Math.abs(elevator.currentFloor - floor);

      if ((isIdle || sameDir) && distance < minDistance) {
        bestElevatorIndex = index;
        minDistance = distance;
      }
    });

    // Add the floor to the chosen elevator's target list
    if (bestElevatorIndex !== null) {
      const updated = [...elevators];
      const targetSet = new Set(updated[bestElevatorIndex].targetFloors);
      targetSet.add(floor);
      updated[bestElevatorIndex].targetFloors = Array.from(targetSet).sort((a, b) => a - b);
      setElevators(updated);
    }
  };

  /**
   * Handles when someone presses a button inside the elevator (internal request)
   */
  const handleInternalRequest = (elevatorIndex, floor) => {
    const updated = [...elevators];
    const targetSet = new Set(updated[elevatorIndex].targetFloors);
    targetSet.add(floor);
    updated[elevatorIndex].targetFloors = Array.from(targetSet).sort((a, b) => a - b);
    setElevators(updated);
  };

  // Expose state and control functions
  return {
    elevators,
    setElevators,
    handleExternalRequest,
    handleInternalRequest,
  };
}
