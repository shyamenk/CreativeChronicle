import React from 'react'

interface ServerIconProps {
  width?: number
  height?: number
  className?: string
}

const ServerIcon: React.FC<ServerIconProps> = ({ width = 40, height = 40, className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#cba6f7"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-server ${className}`}
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" fill="#1e1e2e" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" fill="#1e1e2e" />
      <line x1="6" x2="6.01" y1="6" y2="6" stroke="#f38ba8" />
      <line x1="6" x2="6.01" y1="18" y2="18" stroke="#f38ba8" />
      <line x1="10" x2="20" y1="6" y2="6" stroke="#6c7086" strokeWidth="1" />
      <line x1="10" x2="20" y1="18" y2="18" stroke="#6c7086" strokeWidth="1" />
    </svg>
  )
}

export default ServerIcon
