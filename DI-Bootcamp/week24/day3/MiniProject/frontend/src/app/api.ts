import { store } from './store';
import { setCredentials, logout } from '../features/auth/authSlice';

const API_BASE = '/api';

interface RefreshResponse {
  accessToken: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch(`${API_BASE}/auth/refresh`, {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        const data: RefreshResponse = await response.json();
        store.dispatch(setCredentials({
          user: data.user,
          accessToken: data.accessToken
        }));
        return data.accessToken;
      } else {
        store.dispatch(logout());
        return null;
      }
    } catch {
      store.dispatch(logout());
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const state = store.getState();
  let accessToken = state.auth.accessToken;

  const makeRequest = async (token: string | null): Promise<Response> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>)
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      credentials: 'include'
    });
  };

  let response = await makeRequest(accessToken);

  // If unauthorized, try to refresh token and retry
  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      response = await makeRequest(newToken);
    } else {
      throw new Error('Session expired. Please log in again.');
    }
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
};

// Auth API
export const authApi = {
  register: async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },

  logout: async () => {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      credentials: 'include'
    });
  },

  refresh: async () => {
    return refreshAccessToken();
  }
};

// Stories API
export const storiesApi = {
  getAll: (filter?: string) =>
    apiRequest<any[]>(`/stories${filter ? `?filter=${filter}` : ''}`),

  getOne: (id: number) =>
    apiRequest<any>(`/stories/${id}`),

  create: (title: string, content: string) =>
    apiRequest<any>('/stories', {
      method: 'POST',
      body: JSON.stringify({ title, content })
    }),

  update: (id: number, data: { title?: string; content?: string }) =>
    apiRequest<any>(`/stories/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),

  delete: (id: number) =>
    apiRequest<any>(`/stories/${id}`, { method: 'DELETE' })
};

// Contributors API
export const contributorsApi = {
  getByStory: (storyId: number) =>
    apiRequest<any[]>(`/contributors/${storyId}`),

  add: (storyId: number, userId: number) =>
    apiRequest<any>('/contributors', {
      method: 'POST',
      body: JSON.stringify({ story_id: storyId, user_id: userId })
    }),

  remove: (id: number) =>
    apiRequest<any>(`/contributors/${id}`, { method: 'DELETE' })
};

// Users API
export const usersApi = {
  search: (query: string) =>
    apiRequest<any[]>(`/users?search=${encodeURIComponent(query)}`)
};
