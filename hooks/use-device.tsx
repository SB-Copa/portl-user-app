import { useContext } from 'react';
import { DeviceContext } from '@/contexts/device-context';

/**
 * Simple hook to access device and breakpoint information
 */
export const useDevice = () => {
  const context = useContext(DeviceContext);
  
  if (context === undefined) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  
  return context;
};

/**
 * Check if current viewport is at or above a breakpoint
 */
export const useBreakpoint = (breakpoint: 'sm' | 'md' | 'lg' | 'xl' | '2xl'): boolean => {
  const { breakpoint: current } = useDevice();
  
  const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpointOrder.indexOf(current);
  const targetIndex = breakpointOrder.indexOf(breakpoint);
  
  return currentIndex >= targetIndex;
};