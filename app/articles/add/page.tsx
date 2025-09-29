import ArticleForm from "@/components/ArticleForm";

async function submitArticle(data: { title: string; body: string }) {
  const res = await fetch("http://localhost:3000/article", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to add article");
  }

  alert("Article added successfully!");
}

export default function AddArticlePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Article</h1>
      <ArticleForm onSubmit={submitArticle} />
    </div>
  );
}
