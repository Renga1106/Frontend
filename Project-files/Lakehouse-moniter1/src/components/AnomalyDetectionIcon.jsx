import React from 'react';

const AnomalyDetectionIcon = ({ className = '' }) => (
  <svg
    className={className}
    width="1em"
    height="1em"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Anomaly Detection"
  >
    {/* White magnifying glass circle - bold */}
    <circle cx="50" cy="48" r="26" fill="none" stroke="#ffffff" strokeWidth="7" />

    {/* Magnifying glass handle */}
    <line x1="70" y1="70" x2="82" y2="82" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />

    {/* Single virus dot in center - represents anomaly */}
    <circle cx="50" cy="48" r="4" fill="#ffffff" />
  </svg>
);

export default AnomalyDetectionIcon;
