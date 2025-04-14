import React from 'react';

type CircleProgressBarProps = {
  progress: number;
  size?: number;
  strokeWidth?: number;
  bgColor?: string;
  progressColor?: string;
  className?: string;
};

const CircleProgressBar = ({
  progress,
  size = 100,
  strokeWidth = 10,
  bgColor = '#f3f3f3',
  progressColor = '#FFE37E',
  className = ''
}: CircleProgressBarProps) => {
  const viewBoxSize = size;
  const CENTER = viewBoxSize / 2;
  const RADIUS = (viewBoxSize - strokeWidth) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const offset = CIRCUMFERENCE * (1 - progress / 100);

  return (
    <div className={className}>
      <svg className="rotate-90 transform" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} width={size} height={size}>
        <circle cx={CENTER} cy={CENTER} r={RADIUS} stroke={bgColor} strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default CircleProgressBar;
