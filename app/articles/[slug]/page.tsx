// app/articles/[slug]/page.tsx
import { fetchDrupalArticleBySlug } from "@/lib/fetchDrupalArticleBySlug";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params?.slug;

  if (!slug || typeof slug !== "string") {
    notFound();
  }

  const article = await fetchDrupalArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const title = article.attributes?.title || "Untitled";
  const created = article.attributes?.created;
  const bodyHtml = article.attributes?.body?.value || "No body content.";

  return (
    <main className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      {created && (
        <p className="text-sm text-gray-500 mb-4">
          Published: {new Date(created).toLocaleDateString()}
        </p>
      )}

      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </main>
  );
}
