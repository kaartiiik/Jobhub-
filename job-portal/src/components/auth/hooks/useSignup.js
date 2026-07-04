"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/authStore";

import {
  signup,
  login as loginUser,
} from "@/services/auth";

export default function useSignup() {
  const router = useRouter();

  const login = useAuthStore(
    (state) => state.login
  );

  const handleSignup = async (
    data
  ) => {
    try {
      
      await signup(data);

      const result =
        await loginUser({
          email: data.email,
          password: data.password,
        });

      login(result.user);

      localStorage.setItem(
        "token",
        result.token
      );

      Cookies.set(
        "token",
        result.token,
        {
          expires: 1,
        }
      );

      if (
        result.user.role ===
        "recruiter"
      ) {
        router.push("/recruiter");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Signup Failed"
      );
    }
  };

  return {
    handleSignup,
  };
}