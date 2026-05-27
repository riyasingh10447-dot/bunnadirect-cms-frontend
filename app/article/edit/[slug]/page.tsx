"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import DashboardLayout from "@/app/components/DashboardLayout";
import useAuth from "@/app/hooks/useAuth";
import "react-quill-new/dist/quill.snow.css";
import { Paperclip } from "lucide-react";

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
  const [category, setCategory] = useState("GENERAL_HEALTH");
  const [contentType, setContentType] = useState("ARTICLE");

  useEffect(() => {
    if (!loading && !authorized) {
      router.push("/admin-login");
    }
  }, [loading, authorized, router]);

  useEffect(() => {
    const fetchArticle = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      
      try {
        const res = await fetch(`${backendUrl}/article/${slug}`, {
          cache: 'no-store'
        });

        // Check if response is JSON or HTML
        const contentTypeHeader = res.headers.get("content-type");
        if (!res.ok || !contentTypeHeader?.includes("application/json")) {
          throw new Error("Backend ne data nahi bheja. Check karein ki article exist karta hai ya nahi.");
        }

        const data = await res.json();
        setArticle(data);
        setTitle(data.title || "");
        setMetaKeyword(data.metaKeyword || "");
        setMetaDescription(data.metaDescription || "");
        setBody(data.body || "");
        setCategory(data.category || "GENERAL_HEALTH");
        setContentType(data.contentType || "ARTICLE");
      } catch (err: any) {
        console.error("Fetch Error:", err.message);
        setMessage(`❌ Error: ${err.message}`);
      } finally {
        setFetching(false);
      }
    };

    if (slug) fetchArticle();
  }, [slug]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("Updating...");

    try {
      let imageUrl = article?.imageUrl || "";
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        const uploadRes = await fetch(`${backendUrl}/upload`, {
          method: "POST",
          credentials: "include",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      const res = await fetch(`${backendUrl}/article/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          title, metaKeyword, metaDescription, body, imageUrl, category, contentType,
        }),
      });

      if (res.ok) {
        setMessage("✅ Article updated successfully!");
        setTimeout(() => router.push("/article"), 1500);
      } else {
        const error = await res.json();
        setMessage(`❌ ${error.message || "Update failed"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong.");
    }
  };

  if (loading || fetching) return <div className="p-10 text-center">Loading article...</div>;
  if (!article && !fetching) return <div className="p-10 text-center text-red-500">{message || "Article not found."}</div>;

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow border border-gray-100 my-10">
        <h1 className="text-2xl font-semibold text-[#0A0528] mb-6">Edit Article</h1>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block font-semibold mb-1 text-sm">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
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
            <label className="block font-semibold mb-1 text-sm">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block font-semibold mb-1 text-sm">Meta Keyword</label>
              <input
                type="text"
                value={metaKeyword}
                onChange={(e) => setMetaKeyword(e.target.value)}
                className="w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-sm">Content Type</label>
              <select
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                className="w-full border p-2.5 rounded-lg"
              >
                <option value="ARTICLE">Article</option>
                <option value="NEWS">News</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm">Meta Description</label>
            <textarea
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full border p-2.5 rounded-lg h-20 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm">Body Content</label>
            <ReactQuill
              theme="snow"
              value={body}
              onChange={setBody}
              modules={quillModules}
              className="bg-white h-64 mb-12"
            />
          </div>

          <div className="pt-4 border-t">
            <label className="block font-semibold mb-1 text-sm">Update Image (Optional)</label>
            <div className="flex items-center gap-3">
              <label htmlFor="editImage" className="cursor-pointer flex items-center gap-2 text-teal-600">
                <Paperclip size={20} />
                <span className="text-sm font-medium">Change File</span>
              </label>
              <span className="text-xs text-gray-500">
                {image ? image.name : "Current image will be kept if no new file selected"}
              </span>
            </div>
            <input
              id="editImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files ? setImage(e.target.files[0]) : null}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-teal-600 text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition-all shadow-md"
            >
              Update Article
            </button>
            <button
              type="button"
              onClick={() => router.push("/article")}
              className="bg-gray-100 text-gray-700 px-8 py-2.5 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-lg text-center font-medium ${
            message.startsWith("✅") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {message}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}