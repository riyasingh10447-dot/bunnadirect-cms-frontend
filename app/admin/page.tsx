"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import DashboardLayout from "../components/DashboardLayout";

export default function AdminDashboard() {
  const { loading, authorized } = useAuth(["admin"]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authorized) router.push("/admin-login");
  }, [loading, authorized, router]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome, Admin</h1>
          <div className="text-sm text-gray-500">Overview & quick actions</div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Manage Articles */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">Manage Articles</h3>
            <p className="mt-2 text-sm text-gray-600">Create, update, and organize articles.</p>
            <div className="mt-4">
              <button
                onClick={() => router.push("/article")}
                className="inline-flex items-center gap-2 bg-[#6b8e23] text-white px-4 py-2 rounded-md text-sm hover:opacity-95 transition"
              >
                Go to Articles
              </button>
            </div>
          </div>

          {/* Manage Users */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">Manage Users</h3>
            <p className="mt-2 text-sm text-gray-600">Add or edit CMS users and roles.</p>
            <div className="mt-4">
              <button
                onClick={() => router.push("/admin/add-user")}
                className="inline-flex items-center gap-2 bg-[#6b8e23] text-white px-4 py-2 rounded-md text-sm hover:opacity-95 transition"
              >
                Add User
              </button>
            </div>
          </div>

          {/* List Users */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">List Users</h3>
            <p className="mt-2 text-sm text-gray-600">See registered users and roles.</p>
            <div className="mt-4">
              <button
                onClick={() => router.push("/admin/users")}
                className="inline-flex items-center gap-2 bg-[#6b8e23] text-white px-4 py-2 rounded-md text-sm hover:opacity-95 transition"
              >
                View Users
              </button>
            </div>
          </div>

          {/* My Account */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">My Account</h3>
            <p className="mt-2 text-sm text-gray-600">View and update your account details.</p>
            <div className="mt-4">
              <button
                onClick={() => router.push("/account")}
                className="inline-flex items-center gap-2 bg-[#6b8e23] text-white px-4 py-2 rounded-md text-sm hover:opacity-95 transition"
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

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import DashboardLayout from "../components/DashboardLayout";

export default function AdminDashboard() {
  const { loading, authorized } = useAuth(["admin"]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authorized) router.push("/admin-login");
  }, [loading, authorized, router]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome, Admin</h1>
          <div className="text-sm text-gray-500">Overview & quick actions</div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">Manage Articles</h3>
            <p className="mt-2 text-sm text-gray-600">Create, update and organize articles.</p>
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
            <h3 className="text-lg font-medium text-gray-800">Manage Users</h3>
            <p className="mt-2 text-sm text-gray-600">Add or edit CMS users and roles.</p>
            <div className="mt-4">
              <button
                onClick={() => router.push("/admin/add-user")}
                className="inline-flex items-center gap-2 bg-[#0F8A5F] text-white px-4 py-2 rounded-md text-sm hover:opacity-95 transition"
              >
                Add User
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">List Users</h3>
            <p className="mt-2 text-sm text-gray-600">See registered users and roles.</p>
            <div className="mt-4">
              <button
                onClick={() => router.push("/admin/users")}
                className="inline-flex items-center gap-2 bg-[#6B46C1] text-white px-4 py-2 rounded-md text-sm hover:opacity-95 transition"
              >
                View Users
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800">My Account</h3>
            <p className="mt-2 text-sm text-gray-600">View and update your account details.</p>
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
*/}

{/*"use client"--og;

import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const { loading, authorized } = useAuth(["admin"]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authorized) {
      router.push("/admin-login");
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
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        
      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 border rounded shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Manage Articles</h2>
          <p>Create, update, and delete articles in the CMS.</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => router.push("/article")}
          >
            Go to Articles
          </button>
        </div>

        <div className="p-6 border rounded shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
          <p>Add or edit users who can access the CMS.</p>
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => router.push("/admin/add-user")}
          >
            Add User
          </button>
        </div>

        
        <div className="p-6 border rounded shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">List Users</h2>
          <p>View all registered users with their roles.</p>
          <button
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={() => router.push("/admin/users")}
          >
            View Users
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
{/*
"use client";

import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
const { loading, authorized } = useAuth(["admin"]);


  const router = useRouter();

  useEffect(() => {
    if (!loading && !authorized) {
      router.push("/admin-login");
    }
  }, [loading, authorized, router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-6 border rounded shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Manage Articles</h2>
          <p>Create, update, and delete articles in the CMS.</p>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => router.push("/article")}
          >
            Go to Articles
          </button>
        </div>

        <div className="p-6 border rounded shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
          <p>Add or edit users who can access the CMS.</p>
          <button
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => router.push("/admin/add-user")}
          >
            Add User
          </button>
        </div>

        
        <div className="p-6 border rounded shadow hover:shadow-lg">
          <h2 className="text-xl font-semibold mb-2">List Users</h2>
          <p>View all registered users with their roles.</p>
          <button
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            onClick={() => router.push("/admin/users")}
          >
            View Users
          </button>
        </div>

      </div>
    </div>
  );
}
*/}
{/*
  "use client";

import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("TRENDS_FASHION");
  const [contentType, setContentType] = useState("ARTICLE");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = "";

      // Upload image if exists
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url; // returned URL
      }

      // Create article
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/article`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            metaKeyword,
            metaDescription,
            body,
            imageUrl,
            category,
            contentType,
          }),
        }
      );

      if (res.ok) {
        const article = await res.json();
        setMessage(`Article created ✅ Link: /blog/${article.slug}`);
        setTitle("");
        setMetaKeyword("");
        setMetaDescription("");
        setBody("");
        setImage(null);
      } else {
        const error = await res.json();
        setMessage(`Error: ${error.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">CMS Dashboard</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Select Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="TRENDS_FASHION">Trends & Fashion</option>
            <option value="TYPES_JEWELLERY">Types of Jewellery</option>
            <option value="OCCASIONS_EVENTS">Occasions & Events</option>
            <option value="BUYING_GUIDES_REVIEWS">Buying Guides & Reviews</option>
            <option value="HISTORY_CULTURE">History & Culture</option>
            <option value="CARE_MAINTENANCE">Care & Maintenance</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Select Content Type</label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="ARTICLE">Article</option>
            <option value="NEWS">News</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Meta Keyword</label>
          <input
            type="text"
            value={metaKeyword}
            onChange={(e) => setMetaKeyword(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Meta Description</label>
          <textarea
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="w-full border p-2 rounded h-40"
          />
        </div>

        <div>
          <label className="block font-semibold">Choose File for Image</label>
          <input
            type="file"
            onChange={(e) =>
              e.target.files ? setImage(e.target.files[0]) : null
            }
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Article
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
---og */}
{/*"use client";

import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/article`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, body }),
      }
    );

    if (res.ok) {
      setMessage("Article created successfully ✅");
      setTitle("");
      setBody("");
    } else {
      const error = await res.json();
      setMessage(`Error: ${error.error}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">CMS Dashboard</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="w-full border p-2 rounded h-40"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Article
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
*/}