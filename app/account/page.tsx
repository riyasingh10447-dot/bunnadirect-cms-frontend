"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "../components/DashboardLayout";

interface UserInfo {
  email: string;
  role: "admin" | "editor";
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
          { credentials: "include" }
        );

        if (!res.ok) {
          router.push("/user-login");
          return;
        }

        const data = await res.json();
        setUserInfo(data);
      } catch (err) {
        console.error(err);
        router.push("/user-login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!userInfo) return <p className="p-6">User not found</p>;

  return (
    <DashboardLayout role={userInfo.role}>
      <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow border border-gray-100">
        <h1 className="text-2xl font-semibold text-[#0A0528] mb-6">
          My Account
        </h1>

        <div className="space-y-5 text-[#0A0528]">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium">Email:</span>
            <span>{userInfo.email || "Not available"}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium">Role:</span>
            <span className="capitalize">{userInfo.role}</span>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => router.push("/change-password")}
            className="w-full py-2.5 rounded-md bg-[#0A0528] hover:bg-[#B88D3B] text-white font-semibold text-sm transition shadow-md border border-gray-300"
          >
            Change Password
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

{/*"use client";

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
*/}