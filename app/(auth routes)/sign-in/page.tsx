"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useState } from "react";
import { UserRequest } from "@/types/user";
import { login } from "@/lib/api/clientApi";

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    const values: UserRequest = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const res = await login(values);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <main>
      <form action={handleSubmit}>
        <h1>Sign in</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </div>

        <div>
          <button type="submit">Log in</button>
        </div>

        {error && <p>{error}</p>}
      </form>
    </main>
  );
};

export default SignInPage;
