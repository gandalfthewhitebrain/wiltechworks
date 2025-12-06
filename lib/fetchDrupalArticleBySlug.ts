// lib/fetchDrupalArticleBySlug.ts
import { DRUPAL_BASE_URL } from "./config";
import type { DrupalArticle } from "./fetchDrupalArticles";

export async function fetchDrupalArticleBySlug(
  slug: string
): Promise<DrupalArticle | null> {
  try {
    const url = `${DRUPAL_BASE_URL}/jsonapi/node/article?sort=-created`;

    const res = await fetch(url, {
      next: { revalidate: 60 }, // ISR – refresh every 60s
    });

    if (!res.ok) {
      console.error(
        "Failed to fetch articles from Drupal:",
        res.status,
        res.statusText
      );
      return null;
    }

    const data = await res.json();

    if (!data || !Array.isArray(data.data)) {
      console.error("Unexpected Drupal article response shape:", data);
      return null;
    }

    const articles = data.data as DrupalArticle[];

    // Find article whose alias is exactly /articles/<slug>
    const article = articles.find((item) => {
      const alias = item.attributes?.path?.alias;
      if (!alias) return false;
      return alias === `/articles/${slug}`;
    });

    if (!article) {
      console.warn("No Drupal article found for slug:", slug);
      return null;
    }

    return article;
  } catch (error) {
    console.error("Error in fetchDrupalArticleBySlug:", error);
    return null;
  }
}
