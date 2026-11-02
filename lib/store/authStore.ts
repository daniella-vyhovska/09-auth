import { create } from "zustand";

interface AuthStore {
  user: null | {
    email: string;
    username: string;
    avatar: string;
  };
  isAuthenticated: boolean;

  setUser: (user: AuthStore["user"]) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  clearIsAuthenticated: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),
}));
