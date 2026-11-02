"use client";

import { useEffect } from "react";
import { checkSession, getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, clearIsAuthenticated } = useAuthStore();

  useEffect(() => {
    async function initAuth() {
      try {
        const session = await checkSession();

        if (session?.email) {
          const user = await getMe();
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      }
    }

    initAuth();
  }, [setUser, clearIsAuthenticated]);

  return <>{children}</>;
}
