"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";
import Link from "next/link";

const AuthNavigation = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };

  return isAuthenticated ? (
    <>
      <li>
        <Link href="/profile" prefetch={false}>
          Profile
        </Link>
      </li>
      <li>
        <p>User: {user?.username || user?.email}</p>
        <button onClick={handleLogout}>Logout</button>
      </li>
    </>
  ) : (
    <>
      <li>
        <Link href="/sign-in" prefetch={false}>
          Login
        </Link>
      </li>

      <li>
        <Link href="/sign-up" prefetch={false}>
          Sign up
        </Link>
      </li>
    </>
  );
};

export default AuthNavigation;
