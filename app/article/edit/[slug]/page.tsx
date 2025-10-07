"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import DashboardLayout from "@/app/components/DashboardLayout";
import useAuth from "@/app/hooks/useAuth";

interface Article {
  title: string;
  metaKeyword: string;
  metaDescription: string;
  body: string;
  imageUrl: string;
  category: string;
  contentType: string;
}

export default function EditArticlePage() {
  const { loading, authorized } = useAuth(["admin", "editor"]);
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(true);

  const [title, setTitle] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [contentType, setContentType] = useState("");

  useEffect(() => {
    if (!loading && !authorized) {
      router.push("/admin-login");
    }
  }, [loading, authorized, router]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${slug}`
        );
        const data = await res.json();

        setArticle(data);
        setTitle(data.title);
        setMetaKeyword(data.metaKeyword);
        setMetaDescription(data.metaDescription);
        setBody(data.body);
        setCategory(data.category);
        setContentType(data.contentType);
      } catch (err) {
        console.error(err);
      } finally {
        setFetching(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = article?.imageUrl || "";

      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${slug}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
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
        setMessage("✅ Article updated successfully");
        router.push("/article");
      } else {
        const error = await res.json();
        setMessage(`❌ ${error.message || "Update failed"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  if (loading || fetching) return <p>Loading article...</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Edit Article</h1>

        {message && <p className="mb-4 text-green-600">{message}</p>}

        <form onSubmit={handleUpdate} className="space-y-4">
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
            <label className="block font-semibold">Choose Image</label>
            <input
              type="file"
              onChange={(e) =>
                e.target.files ? setImage(e.target.files[0]) : null
              }
              className="w-full"
            />
          </div>

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
              <option value="BUYING_GUIDES_REVIEWS">
                Buying Guides & Reviews
              </option>
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

          <button
            type="submit"
            className="bg-[#0A0528] text-white px-4 py-2 rounded hover:bg-[#B88D3B] transition"
          >
            Update Article
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
}
{/*"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

interface Article {
  title: string;
  metaKeyword: string;
  metaDescription: string;
  body: string;
  imageUrl: string;
  category: string;
  contentType: string;
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [contentType, setContentType] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${slug}`
        );
        const data = await res.json();
        setArticle(data);

        setTitle(data.title);
        setMetaKeyword(data.metaKeyword);
        setMetaDescription(data.metaDescription);
        setBody(data.body);
        setCategory(data.category);
        setContentType(data.contentType);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = article?.imageUrl || "";

      // Upload new image if selected
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
        imageUrl = uploadData.url;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${slug}`,
        {
          method: "PUT",
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
          credentials: "include",
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("Article updated successfully ✅");
        router.push(`/admin/articles`);
      } else {
        setMessage(data.message || "Update failed ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  };

  if (loading) return <p>Loading article...</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Article</h1>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleUpdate} className="space-y-4">
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
          <label className="block font-semibold">Choose Image</label>
          <input
            type="file"
            onChange={(e) =>
              e.target.files ? setImage(e.target.files[0]) : null
            }
            className="w-full"
          />
        </div>

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

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Article
        </button>
      </form>
    </div>
  );
}
*/}