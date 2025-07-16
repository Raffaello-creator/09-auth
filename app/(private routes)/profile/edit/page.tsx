"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUser } from "@/lib/api/clientApi";

const EditProfilePage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmitEdit = async (formData: FormData) => {
    const username = formData.get("username") as string;

    try {
      const editUser = await updateUser({ username });
      setUser(editUser);
      router.push("/profile");
    } catch (error) {
      console.error("Failed to update username:", error);
    }
  };

  return (
    <main>
      <div>
        <h1>Edit Profile</h1>

        <Image
          src={
            user?.avatar ||
            "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"
          }
          alt="User Avatar"
          width={120}
          height={120}
          priority
        />

        <form action={handleSubmitEdit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={user?.username || ""}
              required
            />
          </div>

          <p>Email: {user?.email || "user_email@example.com"}</p>

          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => router.push("/profile")}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
