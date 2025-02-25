declare module 'react-katex' {
  import { FC, ReactNode } from 'react';

  interface KaTeXProps {
    math: string;
    block?: boolean;
    errorColor?: string;
    renderError?: (error: Error | TypeError) => ReactNode;
    settings?: Record<string, unknown>;
  }

  export const BlockMath: FC<KaTeXProps>;
  export const InlineMath: FC<KaTeXProps>;
} 