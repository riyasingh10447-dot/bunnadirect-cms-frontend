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

        {/* List Users */}
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