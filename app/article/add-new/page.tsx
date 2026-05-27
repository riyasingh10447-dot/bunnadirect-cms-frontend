"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import DashboardLayout from "../../components/DashboardLayout";
import useAuth from "../../hooks/useAuth";
import "react-quill-new/dist/quill.snow.css";
import { Paperclip } from "lucide-react";

// ✅ Dynamically import ReactQuill (no SSR)
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

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
  "header", "bold", "italic", "underline", "strike", "list", "bullet", "align", "link", "image", "blockquote", "code-block",
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
  
  // ✅ Correct Medical Initial State
  const [category, setCategory] = useState("GENERAL_HEALTH");
  const [contentType, setContentType] = useState("ARTICLE");
  const [message, setMessage] = useState("");
  const router = useRouter();

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
          title, metaKeyword, metaDescription, body, imageUrl, category, contentType,
        }),
      });

      if (res.ok) {
        const article = await res.json();
        setMessage(`✅ Article created! View it at /blog/${article.slug}`);
        setTitle(""); setMetaKeyword(""); setMetaDescription(""); setBody(""); setImage(null);
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
        <h1 className="text-2xl font-semibold text-[#0A0528] mb-6">Add New Article</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category */}
          <div>
            <label className="block font-semibold mb-1">Select Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="GENERAL_HEALTH">General Health & Wellness</option>
              <option value="DISEASES_CONDITIONS">Diseases & Conditions</option>
              <option value="MEDICINES_PHARMA">Medicines & Pharmacy</option>
              <option value="LAB_TESTS">Lab Tests & Diagnostics</option>
              <option value="SURGICAL_PROCEDURES">Surgical Procedures</option>
              <option value="MENTAL_HEALTH">Mental Health & Psychology</option>
              <option value="NUTRITION_DIET">Nutrition & Diet</option>
              <option value="FITNESS_EXERCISE">Fitness & Exercise</option>
              <option value="HEALTHCARE_TECHNOLOGY">Healthcare Technology</option>
              <option value="AYURVEDA_HERBAL">Ayurveda & Herbal Medicine</option>
              <option value="SKIN_HAIR_CARE">Skin & Hair Care</option>
              <option value="MOTHER_CHILD_HEALTH">Mother & Child Care</option>
            </select>
          </div>

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

          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Meta Keyword</label>
            <input type="text" value={metaKeyword} onChange={(e) => setMetaKeyword(e.target.value)} className="w-full border p-2 rounded" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Meta Description</label>
            <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className="w-full border p-2 rounded h-20" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Body</label>
            <ReactQuill theme="snow" value={body} onChange={setBody} modules={quillModules} formats={quillFormats} className="bg-white h-60 mb-12" />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload Image</label>
            <div className="flex items-center gap-3">
              <label htmlFor="articleImage" className="cursor-pointer flex items-center gap-2 text-[#0A0528] transition hover:text-teal-600">
                <Paperclip size={20} />
                <span className="text-sm font-medium">Choose File</span>
              </label>
              <span className="text-sm text-gray-600">{image ? image.name : "No file selected"}</span>
            </div>
            <input id="articleImage" type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files ? setImage(e.target.files[0]) : null} />
          </div>

          {/* ✅ Small Button - w-full removed */}
          <button
            type="submit"
            className="bg-teal-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-slate-900 transition-all shadow-sm"
          >
            Publish Article
          </button>
        </form>

        {message && (
          <p className={`mt-4 p-3 rounded text-center font-medium ${message.startsWith("✅") ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-500 border border-red-200"}`}>
            {message}
          </p>
        )}
      </div>
    </DashboardLayout>
  );
}