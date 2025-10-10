type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

type AsyncFetch = {
  [M in HTTPMethod]: (url: string, init?: Omit<RequestInit, 'method'>) => Promise<Response>;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const methods: HTTPMethod[] = ['get', 'post', 'put', 'patch', 'delete'];

export const asyncFetch: AsyncFetch = methods.reduce((acc, method) => {
  acc[method] = async (url, init) => {
    const token = null;
    
    // Determine the full URL - if it's a relative path, prepend the base URL
    const fullUrl = url.startsWith('http://') || url.startsWith('https://') 
      ? url 
      : `${BASE_URL}${url}`;

    const response = await fetch(fullUrl, {
      ...init,
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...init?.headers,
      },
    });

    // Optional: handle HTTP errors here
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response;
  };

  return acc;
}, {} as AsyncFetch);
