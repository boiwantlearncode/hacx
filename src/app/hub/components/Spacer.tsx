import React from 'react';

interface SpacerProps {
  y?: number;
  x?: number;
}

export default function Spacer({ y, x }: SpacerProps) {
  if (!y && !x) {
    throw new Error("At least one of 'y' or 'x' must be provided.");
  }

  const style: React.CSSProperties = {
    height: y ? `${y}px` : undefined,
    width: x ? `${x}px` : undefined,
    margin: 0,
    padding: 0
  };

  return <div style={style}></div>;
}