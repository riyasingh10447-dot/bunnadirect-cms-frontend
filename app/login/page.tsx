"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); // default
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        if (role === "admin") {
          router.push("/admin");
        } else if (role === "editor") {
          router.push("/user");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block font-semibold">Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
          </select>
        </div>

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

        <button
          type="submit"
          className={`w-full py-2 rounded ${
            role === "admin" ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"
          } text-white`}
        >
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      </form>
    </div>
  );
}
