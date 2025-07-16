import { getUserFromServer } from "@/lib/api/serverApi";
import Image from "next/image";
import Link from "next/link";

const ProfilePage = async () => {
  const user = await getUserFromServer();
  return (
    <main>
      <div>
        <div>
          <h1>Profile Page</h1>
          <Link href="/profile/edit">Edit Profile</Link>
        </div>
        <div>
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
        </div>
        <div>
          <p>Username: {user?.username || "your_username"}</p>
          <p>Email: {user?.email || "your_email@example.com"}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
