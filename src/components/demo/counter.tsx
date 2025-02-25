'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CounterProps {
  initialCount?: number;
}

export function Counter({ initialCount = 0 }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="text-2xl font-bold text-gray-900 dark:text-white">
        Count: {count}
      </div>
      <div className="flex items-center gap-4">
        <Button
          onClick={() => setCount(count - 1)}
          variant="secondary"
          aria-label="Decrease count"
        >
          -
        </Button>
        <Button
          onClick={() => setCount(initialCount)}
          variant="secondary"
          aria-label="Reset count"
        >
          Reset
        </Button>
        <Button
          onClick={() => setCount(count + 1)}
          variant="primary"
          aria-label="Increase count"
        >
          +
        </Button>
      </div>
    </div>
  );
} 