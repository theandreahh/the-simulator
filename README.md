# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.




Gestalt Lift Simulator

A React-based elevator simulation that allows users to configure the number of floors and elevators, request elevators from floors, and select destination floors from inside each elevator. The simulation animates elevators moving floor by floor, handling user requests optimally.

Features:

Dynamic configuration of floors and elevators

External controls on each floor (up/down calls)

Internal controls inside each elevator (select destination floors)

Simulated movement with realistic timing (1 second per floor)

Optimal elevator assignment based on proximity and direction

Installation:

Clone the repository

git clone https://github.com/theandreahh/the-simulator.git
cd the-simulator

Install dependencies:

npm install

Running the Application

Start the development server

npm start

Open the app in your browser at http://localhost:3000

Build for Production

npm run build

This will create an optimized production build in the build/ folder.

Code Overview: 

App.jsx: Main component managing global state (floors, elevators, requests) and rendering UI.

State:

floorsCount: Number of floors (0 = Ground).

elevatorsCount: Number of elevator shafts.

elevators: Array of elevator objects with currentFloor, targetFloors, direction, etc.

Controls:

External buttons on each floor call the nearest elevator.

Internal panel inside each elevator selects target floors.

Movement Logic:

A setInterval updates elevator positions every second, moving them one floor towards their next target.

Doors open (doorsOpen: true) when arriving at a target.

User Stories

As a building user, I want to call an elevator to my floor by pressing an up/down button, so that I can ride it.

As an elevator rider, I want to select my desired floor inside the elevator, so that I can reach my destination.

As a system, it should assign the nearest idle or same-direction elevator to minimize wait time.

As a developer, I want the simulation to animate elevators moving floor-by-floor to emulate real behavior.
