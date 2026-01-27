"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset link has been sent to your email.");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#6b8e23] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10 border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-[#3d2b1f]">
            Forgot Password
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Enter your email to receive a reset link
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 px-3 py-2 rounded-md text-sm text-center">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 text-green-600 bg-green-100 px-3 py-2 rounded-md text-sm text-center">
            {message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleForgotPassword} className="space-y-6">
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
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#6b8e23] bg-[#F2F6FB] text-[#0A0528] placeholder-gray-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-[#3d2b1f] hover:bg-[#6b8e23] text-white font-semibold text-sm transition shadow-md border border-gray-300"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-sm text-[#3d2b1f] hover:text-[#6b8e23] hover:underline transition"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
}


{/*
"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset link has been sent to your email.");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F9FC] px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-10 border border-gray-100">
        
        <div className="text-center mb-8">
          <p className="text-gray-500 text-base">
            Enter your email to reset your password
          </p>
        </div>

      
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 px-3 py-2 rounded-md text-sm text-center">
            {error}
          </div>
        )}

       
        {message && (
          <div className="mb-4 text-green-600 bg-green-100 px-3 py-2 rounded-md text-sm text-center">
            {message}
          </div>
        )}

        
        <form onSubmit={handleForgotPassword} className="space-y-6">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F6FB]"
              />
            </div>
          </div>

        
          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-[#1E2A3A] hover:bg-[#16202C] text-white font-medium text-sm transition"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
*/}






{/*--og
  "use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset link has been sent to your email.");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
       
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
          <p className="text-gray-500 mt-1 text-base">Enter your email to reset your password</p>
        </div>

        
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 px-3 py-2 rounded-md text-sm text-center">
            {error}
          </div>
        )}

       
        {message && (
          <div className="mb-4 text-green-600 bg-green-100 px-3 py-2 rounded-md text-sm text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleForgotPassword} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
*/}