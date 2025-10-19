type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

type AsyncFetch = {
    [M in HTTPMethod]: (url: string, init?: Omit<RequestInit, 'method'>) => Promise<Response>;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const methods: HTTPMethod[] = ['get', 'post', 'put', 'patch', 'delete'];

export const asyncFetch: AsyncFetch = methods.reduce((acc, method) => {
    acc[method] = async (url, init) => {
        const fullUrl = url.startsWith('http://') || url.startsWith('https://')
            ? url
            : `${BASE_URL}${url}`;

        const isServer = typeof window === 'undefined';
        
        let headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
        };

        if (isServer) {
            try {
                const { cookies } = await import('next/headers');
                const cookieStore = await cookies();
                const cookieHeader = cookieStore.getAll()
                    .map(cookie => `${cookie.name}=${cookie.value}`)
                    .join('; ');
                
                if (cookieHeader) {
                    headers['Cookie'] = cookieHeader;
                }
            } catch (error) {
                console.warn('Failed to get cookies on server:', error);
            }
        }

        if (init?.headers) {
            headers = { ...headers, ...init.headers as Record<string, string> };
        }

        const response = await fetch(fullUrl, {
            ...init,
            method: method.toUpperCase(),
            headers,
            credentials: 'include',
            cache: isServer ? 'no-store' : init?.cache,
        });

        return response;
    };

    return acc;
}, {} as AsyncFetch);

export const initCsrf = async () => {
    try {
        await asyncFetch.get('https://api.portl.com.ph/sanctum/csrf-cookie')
    } catch (error) {
        console.error('Failed to initialize CSRF token:', error)
        throw error
    }
}
