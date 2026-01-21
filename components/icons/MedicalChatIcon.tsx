import React from 'react';

interface MedicalChatIconProps {
  size?: number;
  className?: string;
}

export const MedicalChatIcon: React.FC<MedicalChatIconProps> = ({ size = 24, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer chat bubble */}
      <path
        d="M20 2H4C2.9 2 2 2.9 2 4V16C2 17.1 2.9 18 4 18H7L11 22L15 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      
      {/* Medical cross - horizontal bar */}
      <rect
        x="8"
        y="9"
        width="8"
        height="2"
        fill="currentColor"
        rx="0.5"
      />
      
      {/* Medical cross - vertical bar */}
      <rect
        x="11"
        y="6"
        width="2"
        height="8"
        fill="currentColor"
        rx="0.5"
      />
    </svg>
  );
};
