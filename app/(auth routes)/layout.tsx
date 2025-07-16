"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

interface AuthLayoutProp {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProp) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const clearIsAuth = useAuthStore((state) => state.clearIsAuthenticated);
  useEffect(() => {
    clearIsAuth();
    router.refresh();
    setLoading(false);
  }, [clearIsAuth, router]);

  return <>{loading ? <Loading /> : children}</>;
};

export default AuthLayout;
