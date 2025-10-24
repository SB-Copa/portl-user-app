/**
 * Simple breakpoint utilities
 */

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type BreakpointKey = keyof typeof breakpoints;

/**
 * Get current breakpoint (client-side only)
 */
export function getCurrentBreakpoint(): BreakpointKey | 'xs' {
  if (typeof window === 'undefined') {
    return 'xs';
  }

  const width = window.innerWidth;
  
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  
  return 'xs';
}