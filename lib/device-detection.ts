/**
 * Simple device detection for responsiveness
 */

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export interface DeviceInfo {
  type: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

/**
 * Detect device type from user agent string
 */
export function detectDeviceFromUserAgent(userAgent: string): DeviceType {
  const ua = userAgent.toLowerCase();
  
  // Mobile detection
  if (/android.*mobile|iphone|ipod|blackberry|windows phone|opera mini|mobile/.test(ua)) {
    return 'mobile';
  }
  
  // Tablet detection
  if (/ipad|android(?!.*mobile)|tablet|kindle|silk|playbook/.test(ua)) {
    return 'tablet';
  }
  
  return 'desktop';
}

/**
 * Get device info from user agent
 */
export function getDeviceInfo(userAgent: string): DeviceInfo {
  const type = detectDeviceFromUserAgent(userAgent);
  
  return {
    type,
    isMobile: type === 'mobile',
    isTablet: type === 'tablet',
    isDesktop: type === 'desktop',
  };
}

/**
 * Get device info from Next.js headers (server-side)
 */
export function getDeviceInfoFromHeaders(headers: Headers): DeviceInfo {
  const userAgent = headers.get('user-agent') || '';
  return getDeviceInfo(userAgent);
}