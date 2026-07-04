import { create } from "zustand";
import Cookies from "js-cookie";

const useAuthStore = create((set) => ({
  user: null,
  isInitialized: false,

  login: (userData) => {
    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    document.cookie =
      `role=${userData.role}; path=/`;

    set({
      user: userData,
      isInitialized: true,
    });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    Cookies.remove("token");
    document.cookie =
      "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    set({
      user: null,
      isInitialized: true,
    });
  },

  loadUser: () => {
    const storedUser =
      localStorage.getItem("user");

    if (!storedUser) {
      localStorage.removeItem("token");
      Cookies.remove("token");

      set({
        user: null,
        isInitialized: true,
      });
      return;
    }

    try {
      set({
        user: JSON.parse(storedUser),
        isInitialized: true,
      });
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      Cookies.remove("token");

      set({
        user: null,
        isInitialized: true,
      });
    }
  },
}));

export default useAuthStore;
