// app/articles/[slug]/page.tsx
import { fetchDrupalArticleBySlug } from "@/lib/fetchDrupalArticleBySlug";
import { notFound } from "next/navigation";

export const dynamicParams = true;
export const revalidate = 60;

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = await fetchDrupalArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">{article.attributes.title}</h1>
      <p className="text-sm text-gray-500 mb-4">
        Published:{" "}
        {new Date(article.attributes.created).toLocaleDateString()}
      </p>
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: article.attributes.body?.value || "No body content.",
        }}
      />
    </main>
  );
}
