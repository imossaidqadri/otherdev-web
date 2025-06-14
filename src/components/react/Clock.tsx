// src/components/Clock.jsx
import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const options = {
      timeZone: 'Asia/Karachi',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short'
    };

    const update = () => {
      try {
        const now = new Date();
        let timeString = now.toLocaleTimeString('en-US', options);
        // The original code had a replace for (PKT),
        // but timeZoneName: 'short' should handle this.
        // Keeping it just in case of inconsistencies in Node versions or Intl.
        timeString = timeString.replace(/\s*\(PKT\)/, '');
        setTime(timeString);
      } catch (e) {
        setTime('--:-- PKT'); // Fallback time string
      }
    };

    update(); // Initial time set
    const interval = setInterval(update, 1000); // Update every second
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []); // Empty dependency array ensures this effect runs only once on mount and cleans up on unmount

  return <span className="clock-time min-w-[17ch] tabular-nums">{time}</span>;
}
