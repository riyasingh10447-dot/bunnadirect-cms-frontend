"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic"; // ✅ MISSING IMPORT added here
import DashboardLayout from "../../components/DashboardLayout";
import useAuth from "../../hooks/useAuth";
import "react-quill-new/dist/quill.snow.css";
import { Paperclip } from "lucide-react";

// ✅ Dynamically import ReactQuill (no SSR)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// ✅ Quill toolbar configuration
const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    ["link", "image", "blockquote", "code-block"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "align",
  "link",
  "image",
  "blockquote",
  "code-block",
];

interface UserInfo {
  email: string;
  role: "admin" | "editor";
}

export default function AddArticlePage() {
  const { loading, authorized } = useAuth(["admin", "editor"]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [title, setTitle] = useState("");
  const [metaKeyword, setMetaKeyword] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("TRENDS_FASHION");
  const [contentType, setContentType] = useState("ARTICLE");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // ✅ Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`, {
          credentials: "include",
        });
        if (!res.ok) {
          router.push("/user-login");
          return;
        }
        const data = await res.json();
        setUserInfo(data);
      } catch (err) {
        console.error(err);
        router.push("/user-login");
      }
    };

    if (!loading && authorized) fetchUser();
  }, [loading, authorized, router]);

  // ✅ Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      let imageUrl = "";

      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article`, {
        method: "POST",
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
      });

      if (res.ok) {
        const article = await res.json();
        setMessage(`✅ Article created! View it at /blog/${article.slug}`);
        setTitle("");
        setMetaKeyword("");
        setMetaDescription("");
        setBody("");
        setImage(null);
      } else {
        const error = await res.json();
        setMessage(`❌ ${error.message || "Failed to create article"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!authorized) return null;
  if (!userInfo) return <p>Fetching user info...</p>;

  return (
    <DashboardLayout role={userInfo.role}>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow border border-gray-100">
        <h1 className="text-2xl font-semibold text-[#0A0528] mb-6">
          Add New Article
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category */}
          <div>
            <label className="block font-semibold mb-1">Select Category</label>
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

          {/* Content Type */}
          <div>
            <label className="block font-semibold mb-1">Select Content Type</label>
            <select
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="ARTICLE">Article</option>
              <option value="NEWS">News</option>
            </select>
          </div>

          {/* Title */}
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

          {/* Meta Keyword */}
          <div>
            <label className="block font-semibold mb-1">Meta Keyword</label>
            <input
              type="text"
              value={metaKeyword}
              onChange={(e) => setMetaKeyword(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block font-semibold mb-1">Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full border p-2 rounded h-20"
            />
          </div>

          
          <div>
            <label className="block font-semibold mb-1">Body</label>
            <ReactQuill
              theme="snow"
              value={body}
              onChange={setBody}
              modules={quillModules}
              formats={quillFormats}
              className="bg-white h-60 mb-12"
              placeholder="Write your article here..."
            />
          </div>

 {/* ✅ old
          <div>
 
            <label className="block font-semibold mb-1">Body</label>
     
            <textarea
 
              value={body}
 
             
              onChange={(e) => setBody(e.target.value)}
            
              required
              
               
              className="w-full border p-2 rounded h-40"
            
            />
        
          </div>
*/}
          {/* Image Upload 
          <div>
            <label className="block font-semibold mb-1">Choose File for Image</label>
            <input
              type="file"
              onChange={(e) =>
                e.target.files ? setImage(e.target.files[0]) : null
              }
              className="w-full"
            />
          </div>
*/}
          <div className="mb-4">
  <label className="block font-semibold mb-1">Upload Image</label>

  <div className="flex items-center gap-3">
    <label
      htmlFor="articleImage"
      className="cursor-pointer flex items-center gap-2 text-[#0A0528]  transition"
    >
      <Paperclip size={20} />
      
    </label>

    <span className="text-sm text-gray-600">
      {image ? image.name : "No file selected"}
    </span>
  </div>

  <input
    id="articleImage"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) =>
      e.target.files ? setImage(e.target.files[0]) : null
    }
  />
</div>


          {/* Submit */}
          <button
            type="submit"
            className="bg-[#0A0528] text-white px-4 py-2 rounded hover:bg-[#B88D3B] transition"
          >
            Add Article
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 ${
              message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}


 
 {/*"use client";

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

    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const uploadRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload`,
        {
          method: "POST",
          credentials: "include", // ✅ important for auth
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();
      imageUrl = uploadData.url;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/article`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ important for auth
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
      setMessage(`Error: ${error.message || "Failed to create article"}`);
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
*/}

