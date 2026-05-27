"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

type ApiUser = { role?: string };
type LoginResponse = {
  mustChangePassword?: boolean;
  role?: string;           // either top-level...
  user?: ApiUser;          // ...or nested under user
  message?: string;
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // expect httpOnly cookie from backend
        body: JSON.stringify({ email, password }),
      });

      // If backend might return non-JSON on errors, guard this:
      let data: LoginResponse = {};
      try { data = await res.json(); } catch { /* ignore parse error */ }

      if (!res.ok) {
        // Security-preserving generic message for auth-related failures
        const genericAuthMsg = "Invalid email or password.";
        const message =
          res.status === 401 || res.status === 403
            ? genericAuthMsg
            : data?.message || "Login failed";
        setError(message);
        return;
      }

      const mustChange = Boolean(data.mustChangePassword);
      if (mustChange) {
        router.push("/change-password");
        return;
      }

      // Normalize role from response (top-level or nested)
      const rawRole =
        (data.user?.role ?? data.role ?? "").toString().toLowerCase();

      // Route map based on server-trusted role
      if (rawRole === "admin") {
        router.push("/admin");
      } else if (rawRole === "editor" || rawRole === "user") {
        router.push("/user");
      } else {
        // Fallback if server didn’t send role
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A]  px-4">
  <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10 border border-gray-100">
    
    <div className="text-center mb-8 flex justify-center">
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="h-20 w-auto object-contain"
      />
    </div>

    {/* Error Message */}
    {error && (
      <div
        className="mb-3 text-red-600 bg-red-100 px-3 py-2 rounded-md text-sm text-center"
        role="alert"
        aria-live="polite"
      >
        {error}
      </div>
    )}

        {/* Neutral guidance (always visible; doesn’t leak account existence) */}
        <p className="mb-4 text-xs text-gray-500 text-center">
          If you’re a new user, please ask an admin to add your account.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-[#F2F6FB] text-[#0A0528] placeholder-gray-500"
                autoComplete="username"
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                required
                placeholder="********"
                className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-slate-900 bg-[#F2F6FB] text-[#0A0528] placeholder-gray-500"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 inset-y-0 my-auto text-gray-400 hover:text-slate-900"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-md bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-semibold text-sm transition shadow-md border border-gray-300"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-sm text-slate-900 hover:text-teal-600 hover:underline transition"
            onClick={() => router.push("/forgot-password")}
          >
            Forgot password?
          </button>
        </div>
      </div>
    </div>
  );
}

{/*"use client";

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
       
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#0A0528]">
            JohriWorksCMS
          </h1>
        </div>

     
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 px-3 py-2 rounded-md text-sm text-center">
            {error}
          </div>
        )}

   
        <form onSubmit={handleLogin} className="space-y-6">
       
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

         
          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-[#0A0528] hover:bg-[#B88D3B] text-white font-semibold text-sm transition shadow-md border border-gray-300"
          >
            Sign in
          </button>
        </form>

       
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
*/}