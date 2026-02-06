import React from 'react';

const DataQualityIcon = ({ className = '' }) => (
  <svg
    className={className}
    width="1em"
    height="1em"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Data Quality Health"
  >
    {/* White circular background */}
    <circle cx="50" cy="50" r="49" fill="#ffffff" opacity="1" />
    <circle cx="50" cy="50" r="47" fill="none" stroke="#f0f0f0" strokeWidth="0.5" />

    {/* Main shield - green */}
    <path
      d="M 50 20 L 28 32 L 28 50 C 28 68 50 78 50 78 C 50 78 72 68 72 50 L 72 32 Z"
      fill="none"
      stroke="#10b981"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Checkmark inside shield - green */}
    <path
      d="M 42 52 L 50 60 L 62 45"
      fill="none"
      stroke="#10b981"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DataQualityIcon;
