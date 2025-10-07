"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import DashboardLayout from "../components/DashboardLayout";

export default function UserDashboard() {
  const { loading, authorized } = useAuth(["editor"]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authorized) router.push("/user/login");
  }, [loading, authorized, router]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome, Editor</h1>
          <div className="text-sm text-gray-500">Quick access</div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">Manage Articles</h3>
            <p className="mt-2 text-sm text-gray-600">Create and edit your posts.</p>
            <div className="mt-4">
              <button
                onClick={() => router.push("/article")}
                className="inline-flex items-center gap-2 bg-[#1E2A3A] text-white px-4 py-2 rounded-md text-sm hover:opacity-95 transition"
              >
                Go to Articles
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">My Account</h3>
            <p className="mt-2 text-sm text-gray-600">Update profile & settings.</p>
            <div className="mt-4">
              <button
                onClick={() => router.push("/account")}
                className="inline-flex items-center gap-2 bg-[#4C51BF] text-white px-4 py-2 rounded-md text-sm hover:opacity-95 transition"
              >
                My Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}



{/*"use client";

import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserDashboard() {
  const { loading, authorized } = useAuth(["editor"]);

  const router = useRouter();

  useEffect(() => {
    if (!loading && !authorized) {
      router.push("/user/login");
    }
  }, [loading, authorized, router]);

  if (loading) return <p>Loading...</p>;
const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Editor Dashboard</h1>

      <div className="grid gap-6">
        <div className="p-6 border rounded shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Manage Articles</h2>
          <p>Create, update, and delete articles in the CMS.</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => router.push("/article")} // reuse admin/articles
          >
            Go to Articles
          </button>
        </div>

      
        <div className="p-6 border rounded shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">My Account</h2>
          <p>View your account information.</p>
          <button
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            onClick={() => router.push("/account")}
          >
            My Account
          </button>
        </div>
      </div>

       
    <div className="flex justify-end mt-6">
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
    </div>
  );
}
*/}