"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserInfo {
  email: string;
  role: string;
}

export default function MyAccountPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`,
          {
            credentials: "include", // important for auth
          }
        );

        if (!res.ok) {
          router.push("/user-login"); // redirect if not logged in
          return;
        }

        const data = await res.json();
        setUserInfo(data); // { userId, role }
      } catch (err) {
        console.error(err);
        router.push("/user-login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  if (!userInfo) return <p>User not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded shadow mt-8">
      <h1 className="text-3xl font-bold mb-4">My Account</h1>

      <div className="space-y-4">
        <div>
          <strong>Email:</strong> {userInfo.email || "Not available"}
        </div>
        <div>
          <strong>Role:</strong> {userInfo.role}
        </div>
      </div>
    </div>
  );
}
