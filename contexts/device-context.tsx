'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { DeviceInfo } from '@/lib/device-detection';
import { BreakpointKey, getCurrentBreakpoint } from '@/lib/breakpoints';

type DeviceContextType = {
  // Device type
  device: DeviceInfo;

  // Current breakpoint
  breakpoint: BreakpointKey | 'xs';

  // Convenience properties
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
};

export const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

type DeviceProviderProps = {
  children: ReactNode;
  initialDevice?: DeviceInfo;
};

export const DeviceProvider: React.FC<DeviceProviderProps> = ({
  children,
  initialDevice = { type: 'desktop', isMobile: false, isTablet: false, isDesktop: true }
}) => {


  const [device, setDevice] = useState<DeviceInfo>(initialDevice);
  const [breakpoint, setBreakpoint] = useState<BreakpointKey | 'xs'>('xs');
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side detection
  useEffect(() => {
    setIsClient(true);

    // Update device info on client side
    if (typeof navigator !== 'undefined') {
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);

      setDevice({
        type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
        isMobile,
        isTablet,
        isDesktop: !isMobile && !isTablet,
      });
    }

    // Set initial breakpoint
    setBreakpoint(getCurrentBreakpoint());
  }, []);

  // Listen for window resize
  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      setBreakpoint(getCurrentBreakpoint());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  const value: DeviceContextType = {
    device,
    breakpoint,
    isMobile: device.isMobile,
    isTablet: device.isTablet,
    isDesktop: device.isDesktop,
  };

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
};