"use client";

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

         {/* My Account */}
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
    </div>
  );
}
