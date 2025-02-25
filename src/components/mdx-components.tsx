'use client';

import type { MDXComponents } from 'mdx/types';
import NextImage from 'next/image';
import { Button } from '@/components/ui/button';
import { Callout } from '@/components/ui/callout';
import { Card } from '@/components/ui/card';
import { Counter } from '@/components/demo/counter';

const components = {
  // Custom components
  Button: Button, // Directly use the Button component
  Callout: Callout,
  Card: Card,
  Counter: Counter,
  
  // Next.js components
  Image: ({ src, alt, width, height, ...props }: React.ComponentProps<typeof NextImage>) => {
    if (!src) return null;
    
    // Handle both remote and local images
    const isRemoteImage = typeof src === 'string' && (src.startsWith('http') || src.startsWith('//'));
    
    if (isRemoteImage) {
      return (
        <div className="relative w-full h-64 my-8">
          <NextImage
            src={src}
            alt={alt || ''}
            fill
            className="object-cover rounded-lg"
            {...props}
          />
        </div>
      );
    }

    // For local images where we know the dimensions
    return (
      <NextImage
        src={src}
        alt={alt || ''}
        width={width || 800}
        height={height || 400}
        className="rounded-lg my-8"
        {...props}
      />
    );
  },
  
  // Enhance code blocks
  pre: ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="relative not-prose my-8 rounded-lg overflow-hidden bg-gray-950">
        <pre className="overflow-x-auto p-4 text-sm leading-6">
          {children}
        </pre>
      </div>
    );
  },
  code: ({ children, className }: { children: React.ReactNode; className?: string }) => {
    // If there's no className, it's an inline code block
    if (!className) {
      return (
        <code className="rounded bg-gray-200 px-1 py-0.5 text-gray-900 text-sm">
          {children}
        </code>
      );
    }
    return (
      <code className={className}>
        {children}
      </code>
    );
  },
  // Enhance tables
  table: ({ children }: { children: React.ReactNode }) => (
    <div className="my-8 w-full overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: { children: React.ReactNode }) => (
    <thead className="bg-gray-50">
      {children}
    </thead>
  ),
  th: ({ children }: { children: React.ReactNode }) => (
    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: { children: React.ReactNode }) => (
    <td className="border border-gray-300 px-4 py-2">
      {children}
    </td>
  ),
} satisfies MDXComponents;

export { components as mdxComponents }; 