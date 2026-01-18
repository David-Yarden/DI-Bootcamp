// Shared types for frontend and backend

export interface User {
  id: number;
  username: string;
  email: string;
  created_at?: string;
}

export interface UserWithPassword extends User {
  password_hash: string;
}

export interface Story {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author?: User;
  contributors?: User[];
  created_at: string;
  updated_at: string;
}

export interface Contributor {
  id: number;
  story_id: number;
  user_id: number;
  user?: User;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface CreateStoryInput {
  title: string;
  content: string;
}

export interface UpdateStoryInput {
  title?: string;
  content?: string;
}

export interface AddContributorInput {
  story_id: number;
  user_id: number;
}

export interface ApiError {
  message: string;
  error?: string;
}
