import { cn } from '@/utils/className';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={cn(
        `bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900 p-6`,
        className
      )}
    >
      {children}
    </div>
  );
};
