"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function useNavbar() {
  const router = useRouter();

  const user = useAuthStore(
    (state) => state.user
  );

  const logout = useAuthStore(
    (state) => state.logout
  );

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const role = user?.role?.toLowerCase();

  const isCandidate =
    role === "candidate";

  const isRecruiter =
    role === "recruiter";

  return {
    user,
    isCandidate,
    isRecruiter,
    handleLogout,
  };
}
