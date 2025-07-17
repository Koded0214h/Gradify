const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export function getToken() {
  return localStorage.getItem('token');
}

export async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  let headers = {
    ...options.headers,
  };
  // Only add Content-Type if not FormData
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  // Only add Authorization if not register or login or token
  if (
    token &&
    !endpoint.startsWith('/api/register') &&
    !endpoint.startsWith('/api/login') &&
    !endpoint.startsWith('/api/token')
  ) {
    headers['Authorization'] = `Token ${token}`;
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export { BASE_URL }; 