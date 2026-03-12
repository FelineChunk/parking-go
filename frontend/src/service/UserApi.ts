import api from "./Api";

// Dari model public_users (schema public)
export type PublicUser = {
  id_user: string;
  username: string | null;
  created_at: string | null;
  role: "admin" | "petugas" | "owner" | "super" | null;
};

// Dari model auth_users (schema auth) — field yang relevan untuk frontend
export type AuthUser = {
  id: string;
  email: string | null;
  phone: string | null;
  created_at: string | null;
  last_sign_in_at: string | null;
  is_anonymous: boolean;
  // relasi ke public_users
  users: PublicUser | null;
};

// GET /users — hanya admin & super
export const getUsers = () => {
  return api.get<AuthUser[]>("/users");
};

// GET /users/:id
export const getUserById = (id: string) => {
  return api.get<AuthUser>(`/users/${id}`);
};

// GET /users/email/:email
export const getUserByEmail = (email: string) => {
  return api.get<AuthUser>(`/users/email/${encodeURIComponent(email)}`);
};

export const getPublicUser = (id: string) => {
  return api.get<PublicUser>(`/users/profile/${id}`);
};