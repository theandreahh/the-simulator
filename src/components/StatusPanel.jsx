import React, { useEffect } from 'react';
import { getStatus } from '../utils/api';

const StatusPanel = () => {
  useEffect(() => {
    // Poll status silently every 5 seconds (optional)
    const fetchStatus = async () => {
      try {
        await getStatus(); // Still contacts backend, but does nothing with result
      } catch (err) {
        console.error('Status fetch failed:', err);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return null; // ⛔️ No visible UI
};

export default StatusPanel;

/**
 * StatusPanel Component (Silent Mode)
 *
 * This component runs in the background.
 * It quietly sends a request to the backend every 5 seconds to check the status.
 * It doesn't show anything on the screen.
 *
 * Purpose:
 * - Can be used for logging or keeping the server "aware" of activity
 * - Useful for future features like health monitoring or admin dashboards
 */