'use client';

import { Button } from '@/components/ui/button';

interface InteractiveButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function InteractiveButton({ children, className }: InteractiveButtonProps) {
  return (
    <Button
      className={className}
      onClick={() => alert('Button clicked! This demonstrates the interactive capabilities of MDX components.')}
    >
      {children}
    </Button>
  );
} 