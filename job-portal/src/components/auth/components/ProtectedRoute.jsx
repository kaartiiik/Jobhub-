"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function ProtectedRoute({
  children,
}) {
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const user = useAuthStore(
    (state) => state.user
  );

  const isInitialized = useAuthStore(
    (state) => state.isInitialized
  );

  useEffect(() => {
    if (
      isInitialized &&
      !user &&
      !isRedirecting
    ) {
      setIsRedirecting(true);
      router.replace("/login");
    }
  }, [
    user,
    isInitialized,
    isRedirecting,
    router,
  ]);

  if (!isInitialized) {
    return <p>Loading...</p>;
  }

  if (!user || isRedirecting) {
    return <p>Redirecting...</p>;
  }

  return children;
}
