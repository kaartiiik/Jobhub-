"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/authStore";

import { login as loginUser } from "@/services/auth";

export default function useLogin() {
  const router = useRouter();

  const login = useAuthStore(
    (state) => state.login
  );

  const handleLogin = async (
    data
  ) => {
    try {
      const response =
        await loginUser(data);

      login(response.user);

      localStorage.setItem(
        "token",
        response.token
      );

      Cookies.set(
        "token",
        response.token,
        {
          expires: 1,
        }
      );

      if (
        response.user.role ===
        "recruiter"
      ) {
        router.replace("/recruiter");
      } else {
        router.replace("/dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
    }
  };

  return {
    handleLogin,
  };
}
