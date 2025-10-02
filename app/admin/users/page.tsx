"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";

interface User {
  id: number;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminUsersPage() {
 const { loading, authorized } = useAuth(["admin"]);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authorized) {
      router.push("/admin-login");
    }
  }, [loading, authorized, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
          { credentials: "include" }
        );
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

      {users.length === 0 && <p>No users found.</p>}

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Role</th>
            <th className="border px-4 py-2 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2 capitalize">{user.role}</td>
              <td className="border px-4 py-2">
                {new Date(user.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
