
import { headers } from 'next/headers';
import { getDeviceInfoFromHeaders } from './device-detection';

export async function getServerDevice() {
  const headersList = await headers();
  return getDeviceInfoFromHeaders(headersList);
}