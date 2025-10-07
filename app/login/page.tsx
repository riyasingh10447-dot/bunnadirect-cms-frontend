"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMustChangePassword(data.mustChangePassword || false);

        if (data.mustChangePassword) {
          router.push("/change-password");
        } else if (role === "admin") {
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
    <div className="min-h-screen flex items-center justify-center bg-[#0A0528] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#0A0528]">
            JohriWorksCMS
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 px-3 py-2 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-[#0A0528] mb-1">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-2 focus:outline-none focus:ring-2 focus:ring-[#B88D3B] bg-[#F2F6FB] text-[#0A0528]"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#0A0528] mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 inset-y-0 my-auto text-gray-400 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#B88D3B] bg-[#F2F6FB] text-[#0A0528] placeholder-gray-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#0A0528] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 inset-y-0 my-auto text-gray-400 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="********"
                className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#B88D3B] bg-[#F2F6FB] text-[#0A0528] placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 inset-y-0 my-auto text-gray-400 hover:text-[#B88D3B]"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-[#0A0528] hover:bg-[#B88D3B] text-white font-semibold text-sm transition shadow-md border border-gray-300"
          >
            Sign in
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-sm text-[#0A0528] hover:text-[#B88D3B] hover:underline transition"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}
