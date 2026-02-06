import React from 'react';

const IncidentSLAComplianceIcon = ({ className = '' }) => (
  <svg
    className={className}
    width="2.2em"
    height="2.2em"
    viewBox="0 0 220 170"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Incident SLA Compliance"
  >
    {/* ================= BIG TIMER ================= */}
    <circle
      cx="95"
      cy="85"
      r="50"
      fill="none"
      stroke="#ffffff"
      strokeWidth="14"
    />

    {/* Timer top hooks */}
    <line
      x1="70"
      y1="35"
      x2="45"
      y2="12"
      stroke="#ffffff"
      strokeWidth="7"
      strokeLinecap="round"
    />
    <line
      x1="120"
      y1="35"
      x2="145"
      y2="12"
      stroke="#ffffff"
      strokeWidth="7"
      strokeLinecap="round"
    />

    {/* Clock hands */}
    <line
      x1="95"
      y1="55"
      x2="95"
      y2="85"
      stroke="#ffffff"
      strokeWidth="7"
      strokeLinecap="round"
    />
    <line
      x1="95"
      y1="85"
      x2="125"
      y2="85"
      stroke="#ffffff"
      strokeWidth="7"
      strokeLinecap="round"
    />

    {/* Center dot */}
    <circle cx="95" cy="85" r="6" fill="#ffffff" />

    {/* ================= BIG ALERT ================= */}
    <g transform="translate(160, 48)">
      <path
        d="M 0 48 L 28 0 L 56 48 Z"
        fill="#ef4444"
      />

      {/* Exclamation mark */}
      <text
        x="28"
        y="36"
        textAnchor="middle"
        fontSize="30"
        fontWeight="bold"
        fill="#ffffff"
        fontFamily="Arial, sans-serif"
      >
        !
      </text>
    </g>
  </svg>
);

export default IncidentSLAComplianceIcon;
