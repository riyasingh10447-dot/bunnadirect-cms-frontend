"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";

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
            ? "Password reset successful. You can now log in."
            : "Password changed successfully."
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

        <h1 className="text-center text-2xl font-semibold text-[#0A0528] mb-6">
          {token ? "Reset Password" : "Change Password"}
        </h1>

        {error && (
          <div className="mb-4 text-red-600 bg-red-100 px-3 py-2 rounded-md text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 text-green-600 bg-green-100 px-3 py-2 rounded-md text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-6">
          {!token && (
            <div>
              <label className="block text-sm font-medium mb-1">Old Password</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                className="w-full border rounded-md p-2 bg-[#F2F6FB]"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border rounded-md p-2 bg-[#F2F6FB]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border rounded-md p-2 bg-[#F2F6FB]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-md bg-[#0A0528] hover:bg-[#B88D3B] text-white font-semibold text-sm transition"
          >
            {token ? "Reset Password" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
