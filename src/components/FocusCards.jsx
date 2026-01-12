import { useState } from 'react';
import { cn } from '../lib/utils';

export function FocusCards({ children, className }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn('grid grid-cols-1 md:grid-cols-4 gap-4', className)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {children.map((child, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          className={cn(
            'transition-all duration-300 ease-out',
            hoveredIndex !== null && hoveredIndex !== index && 'blur-sm scale-[0.98] opacity-60'
          )}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
