import React, { useState, useEffect } from 'react';
import './App.css';

const FLOOR_HEIGHT = 60;

const createInitialElevators = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    currentFloor: 0,
    targetFloors: [],
    direction: null,
    doorsOpen: false
  }));
};

function App() {
  const [floorsCount, setFloorsCount] = useState(7); // 0 to 7 => 8 floors
  const [elevatorsCount, setElevatorsCount] = useState(4);
  const [elevators, setElevators] = useState(createInitialElevators(elevatorsCount));

  useEffect(() => {
    setElevators(createInitialElevators(elevatorsCount));
  }, [elevatorsCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setElevators(prevElevators =>
        prevElevators.map(elevator => {
          if (elevator.targetFloors.length === 0) {
            return { ...elevator, direction: null };
          }

          const nextFloor = elevator.targetFloors[0];

          if (elevator.currentFloor === nextFloor) {
            const newTargetFloors = [...elevator.targetFloors];
            newTargetFloors.shift();
            return {
              ...elevator,
              direction: newTargetFloors.length > 0 ? elevator.direction : null,
              targetFloors: newTargetFloors,
              doorsOpen: true
            };
          }
          
          const newDirection = elevator.currentFloor < nextFloor ? 'up' : 'down';
          const newFloor = elevator.currentFloor + (newDirection === 'up' ? 1 : -1);
          
          const updatedTargets = [...elevator.targetFloors];

          if (newFloor === nextFloor) {
            updatedTargets.shift();
            return {
              ...elevator,
              currentFloor: newFloor,
              targetFloors: updatedTargets,
              direction: updatedTargets.length > 0 ? newDirection : null,
              doorsOpen: true
            };
          }

          return {
            ...elevator,
            currentFloor: newFloor,
            direction: newDirection,
            doorsOpen: false
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleExternalRequest = (floor, direction) => {
    let bestElevatorIndex = null;
    let minDistance = Infinity;

    elevators.forEach((elevator, index) => {
      const isIdle = elevator.targetFloors.length === 0;
      const sameDir = elevator.direction === direction;
      const distance = Math.abs(elevator.currentFloor - floor);

      if ((isIdle || sameDir) && distance < minDistance) {
        bestElevatorIndex = index;
        minDistance = distance;
      }
    });

    if (bestElevatorIndex !== null) {
      const updated = [...elevators];
      const targetSet = new Set(updated[bestElevatorIndex].targetFloors);
      targetSet.add(floor);
      updated[bestElevatorIndex].targetFloors = Array.from(targetSet).sort((a, b) => a - b);
      setElevators(updated);
    }
  };

  const handleInternalRequest = (elevatorIndex, floor) => {
    const updated = [...elevators];
    const targetSet = new Set(updated[elevatorIndex].targetFloors);
    targetSet.add(floor);
    updated[elevatorIndex].targetFloors = Array.from(targetSet).sort((a, b) => a - b);
    setElevators(updated);
  };

  const floors = Array.from({ length: floorsCount + 1 }, (_, i) => i); // 0 to floorsCount

  return (
    <div className="app">
      <header className="page-header">
        <div className="logo">Gestalt Lift Simulator</div>
      </header>

      <div className="config">
        <div>
          <label htmlFor="floors">Number of Floors: </label>
          <input
            id="floors"
            type="number"
            value={floorsCount}
            onChange={(e) =>
              setFloorsCount(Math.max(1, parseInt(e.target.value) || 1))
            }
            min="1"
          />
        </div>
        <div>
          <label htmlFor="elevators">Number of Elevators: </label>
          <input
            id="elevators"
            type="number"
            value={elevatorsCount}
            onChange={(e) =>
              setElevatorsCount(Math.max(1, parseInt(e.target.value) || 1))
            }
            min="1"
          />
        </div>
      </div>
      <div className="building">
      <div className="floor-labels">
  {[...floors].map((floor) => (
    <div key={floor} className="floor-label-row">
      <span>{floor === 0 ? 'G' : floor}</span>

      <div className="external-buttons">
        {floor !== floorsCount && (
          <button onClick={() => handleExternalRequest(floor, 'up')}>↑</button>
        )}
        {floor !== 0 && (
          <button onClick={() => handleExternalRequest(floor, 'down')}>↓</button>
        )}
      </div>
    </div>
  ))}
</div>


        <div className="elevator-shafts">
          {elevators.map((elevator, index) => (
            <div
              key={elevator.id}
              className="elevator-column"
              style={{ height: `${(floorsCount + 1) * FLOOR_HEIGHT}px` }}
            >
              <div
                className="elevator-box"
                style={{
                  bottom: `${elevator.currentFloor * FLOOR_HEIGHT}px`
                }}
              >
             {/*
                <div className="elevator-info">
                  <div>Elevator {elevator.id}</div>
                  <div>Floor {elevator.currentFloor}</div>
                  <div>{elevator.direction || 'idle'}</div>
                </div>
                */}
                <div className="panel">
                  {[...floors].reverse().map((floor) => (
                    <button
                      key={floor}
                      onClick={() => handleInternalRequest(index, floor)}
                    >
                      {floor === 0 ? 'G' : floor}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
