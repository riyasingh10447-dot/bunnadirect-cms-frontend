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