import NextImage from 'next/image';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ComponentProps<typeof NextImage> {
  className?: string;
}

export function Image({ className, ...props }: ImageProps) {
  // Handle remote images (URLs starting with http or //)
  const isRemoteImage = typeof props.src === 'string' && (props.src.startsWith('http') || props.src.startsWith('//'));

  if (isRemoteImage) {
    return (
      <div className={cn('relative w-full h-64 my-8', className)}>
        <NextImage
          {...props}
          alt={props.alt || ''}
          fill
          className={cn('object-cover rounded-lg', className)}
        />
      </div>
    );
  }

  // For local images where we know the dimensions
  return (
    <NextImage
      {...props}
      alt={props.alt || ''}
      width={props.width || 800}
      height={props.height || 400}
      className={cn('rounded-lg my-8', className)}
    />
  );
} 