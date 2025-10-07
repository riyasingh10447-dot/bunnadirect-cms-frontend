"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) setToken(urlToken);
  }, [searchParams]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      let endpoint = "";
      let bodyData: any = {};

      if (token) {
        endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`;
        bodyData = { token, newPassword };
      } else {
        endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`;
        bodyData = { oldPassword, newPassword };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: token ? "omit" : "include",
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          token
            ? "✅ Password reset successful! You can now log in."
            : "✅ Password changed successfully."
        );
        setTimeout(() => {
          router.push(token ? "/login" : "/user");
        }, 1500);
      } else {
        setError(data.message || "Error changing password.");
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
            {token ? "Reset Password" : "Change Password"}
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            {token
              ? "Enter and confirm your new password below"
              : "Update your current account password"}
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
        <form onSubmit={handleChangePassword} className="space-y-6">
          {/* Old Password */}
          {!token && (
            <div>
              <label className="block text-sm font-medium text-[#0A0528] mb-1">
                Old Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 inset-y-0 my-auto text-gray-400 pointer-events-none" />
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  placeholder="********"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#B88D3B] bg-[#F2F6FB] text-[#0A0528] placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 inset-y-0 my-auto text-gray-400 hover:text-[#B88D3B]"
                >
                  {showOld ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>
          )}

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-[#0A0528] mb-1">
              New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 inset-y-0 my-auto text-gray-400 pointer-events-none" />
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="********"
                className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#B88D3B] bg-[#F2F6FB] text-[#0A0528] placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 inset-y-0 my-auto text-gray-400 hover:text-[#B88D3B]"
              >
                {showNew ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-[#0A0528] mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 inset-y-0 my-auto text-gray-400 pointer-events-none" />
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="********"
                className="w-full border border-gray-300 rounded-md pl-10 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-[#B88D3B] bg-[#F2F6FB] text-[#0A0528] placeholder-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 inset-y-0 my-auto text-gray-400 hover:text-[#B88D3B]"
              >
                {showConfirm ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-[#0A0528] hover:bg-[#B88D3B] text-white font-semibold text-sm transition shadow-md border border-gray-300"
          >
            {token ? "Reset Password" : "Update Password"}
          </button>
        </form>

        {/* Back to Login 
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-sm text-[#0A0528] hover:text-[#B88D3B] hover:underline transition"
          >
            Back to Login
          </button>
        </div>
        */}
      </div>
    </div>
  );
}
{/*"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) setToken(urlToken);
  }, [searchParams]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      let endpoint = "";
      let bodyData: any = {};

      if (token) {
        endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`;
        bodyData = { token, newPassword };
      } else {
        endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`;
        bodyData = { oldPassword, newPassword };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: token ? "omit" : "include",
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          token
            ? "✅ Password reset successful! You can now log in."
            : "✅ Password changed successfully."
        );
        setTimeout(() => {
          router.push(token ? "/login" : "/user");
        }, 1500);
      } else {
        setError(data.message || "Error changing password.");
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
            {token
              ? "Enter and confirm your new password"
              : "Update your account password"}
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

       
        <form onSubmit={handleChangePassword} className="space-y-6">
          
          {!token && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Old Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type={showOld ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  placeholder="********"
                  className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F6FB]"
                />
                <button
                  type="button"
                  onClick={() => setShowOld(!showOld)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
                >
                  {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="********"
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F6FB]"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="********"
                className="w-full border border-gray-300 rounded-md pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F2F6FB]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-700"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

         
          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-[#1E2A3A] hover:bg-[#16202C] text-white font-medium text-sm transition"
          >
            {token ? "Reset Password" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

*/}

{/*"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (urlToken) setToken(urlToken);
  }, [searchParams]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      let endpoint = "";
      let bodyData: any = {};

      if (token) {
        // 🔹 If user came from email (reset)
        endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`;
        bodyData = { token, newPassword };
      } else {
        // 🔹 If user is logged in (manual change)
        endpoint = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`;
        bodyData = { oldPassword, newPassword };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: token ? "omit" : "include", // no cookie needed for token-based reset
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(
          token
            ? "✅ Password reset successful! You can now log in."
            : "✅ Password changed successfully."
        );
        setTimeout(() => {
          router.push(token ? "/login" : "/user");
        }, 1500);
      } else {
        setError(data.message || "Error changing password.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {token ? "Reset Password" : "Change Password"}
      </h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {message && <p className="text-green-500 mb-2">{message}</p>}

      <form onSubmit={handleChangePassword} className="space-y-4">
        {!token && (
          <div>
            <label className="block font-semibold">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        <div>
          <label className="block font-semibold">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {token ? "Reset Password" : "Update Password"}
        </button>
      </form>
    </div>
  );
}
*/}