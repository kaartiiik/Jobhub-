"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function RoleGuard({
  allowedRoles,
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
    isInitialized,
    user,
    isRedirecting,
    router,
  ]);

  if (!isInitialized) {
    return <p className="p-10">Loading...</p>;
  }

  if (!user || isRedirecting) {
    return <p className="p-10">Redirecting...</p>;
  }

  const hasAccess =
    allowedRoles.includes(
      user.role
    );

  if (!hasAccess) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold text-red-500">
          Access Denied
        </h1>

        <p>
          You are not allowed to
          access this page.
        </p>
      </div>
    );
  }

  return children;
}
