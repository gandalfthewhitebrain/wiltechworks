// lib/fetchDrupalArticleBySlug.ts
import { DRUPAL_BASE_URL } from "./config";
import type { DrupalArticle } from "./fetchDrupalArticles";

export async function fetchDrupalArticleBySlug(
  slug: string
): Promise<DrupalArticle | null> {
  try {
    // Fetch all articles
    const res = await fetch(`${DRUPAL_BASE_URL}/jsonapi/node/article`, {
      next: { revalidate: 60 },
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
    const articles = data.data as DrupalArticle[];

    // Find the one with alias like /articles/head-turner1
    const article = articles.find((item) => {
      const alias = item.attributes.path?.alias;
      if (!alias) return false;
      return alias.endsWith(`/articles/${slug}`);
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
