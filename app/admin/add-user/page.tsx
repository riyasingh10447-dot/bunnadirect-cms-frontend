"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import DashboardLayout from "../../components/DashboardLayout";

export default function AddUserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("editor");
  const [message, setMessage] = useState("");
  const { loading, authorized } = useAuth(["admin"]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authorized) router.push("/admin-login");
  }, [loading, authorized, router]);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ User created successfully and credentials sent to Gmail");
        setEmail("");
        setPassword("");
        setRole("editor");
      } else {
        setMessage(data.message || "Error creating user");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <DashboardLayout role="admin">
      <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-xl shadow border border-gray-100">
        <h1 className="text-2xl font-semibold text-[#0A0528] mb-6">
          Add New User
        </h1>

        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded-md text-sm ${
              message.startsWith("✅")
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleAddUser} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#0A0528] mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#B88D3B] bg-[#F2F6FB] text-[#0A0528]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#0A0528] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#B88D3B] bg-[#F2F6FB] text-[#0A0528]"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-[#0A0528] mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#B88D3B] bg-[#F2F6FB] text-[#0A0528]"
            >
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-[#3d2b1f] hover:bg-[#6b8e23] text-white font-semibold text-sm transition shadow-md border border-gray-300"
          >
            Add User
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}


{/*"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("editor");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ User created successfully and credentials sent to user over gmail");
        setEmail("");
        setPassword("");
        setRole("editor");
      } else {
        setMessage(data.message || "Error creating user");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add User</h1>

      {message && (
        <p
          className={`mb-4 ${
            message.startsWith("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleAddUser} className="space-y-4">
        <div>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Add User
        </button>
      </form>
    </div>
  );
}
*/}