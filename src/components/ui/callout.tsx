import { cn } from '@/lib/utils';

interface CalloutProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'tip';
  className?: string;
}

const typeStyles = {
  info: 'bg-blue-50 border-blue-200 text-blue-900',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-900',
  tip: 'bg-green-50 border-green-200 text-green-900',
};

export function Callout({ children, type = 'info', className }: CalloutProps) {
  return (
    <div
      className={cn(
        'my-6 rounded-lg border p-4',
        typeStyles[type],
        className
      )}
    >
      {children}
    </div>
  );
} 