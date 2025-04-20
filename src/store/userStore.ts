// components/store/userStore.ts
import { create } from "zustand";

type User = {
  id: number;
  Name: string;
  Email: string;
};

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  loadUserFromToken: () => Promise<void>;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
  loadUserFromToken: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user");

      const user = await res.json();
      set({ user });
    } catch (err) {
      console.error("Error loading user from token", err);
      localStorage.removeItem("token");
      set({ user: null });
    }
  },
}));
