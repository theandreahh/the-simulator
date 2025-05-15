const API_BASE = 'http://localhost:5050/api';

export const logElevatorRequest = async ({ type, floor, direction, elevatorId }) => {
  await fetch(`${API_BASE}/request`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, floor, direction, elevatorId }),
  });
};

export const getConfig = async () => {
  const res = await fetch(`${API_BASE}/config`);
  return res.json();
};

export const getStatus = async () => {
  const res = await fetch(`${API_BASE}/status`);
  return res.json();
};

export const resetSimulation = async () => {
  const res = await fetch(`${API_BASE}/admin/reset`, { method: 'POST' });
  return res.json();
};

export const updateConfig = async ({ floorsCount, elevatorsCount }) => {
  const res = await fetch(`${API_BASE}/config`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ floorsCount, elevatorsCount }),
  });

  if (!res.ok) throw new Error('Failed to update config');

  return await res.json();
};
