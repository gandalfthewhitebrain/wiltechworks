// lib/fetchDrupalViewAbc123.ts

export type DrupalViewRow = {
  title?: string;
  body?: string;
  created?: string;
  [key: string]: any;
};

const DRUPAL_VIEW_URL =
  "https://hless.ob1knobi.com/api/abc123?_format=json";

export async function fetchDrupalViewAbc123(): Promise<DrupalViewRow[]> {
  const res = await fetch(DRUPAL_VIEW_URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch Drupal view:", res.status, res.statusText);
    throw new Error(`Failed to fetch Drupal view: ${res.status}`);
  }

  const data = await res.json();

  if (Array.isArray(data)) {
    return data as DrupalViewRow[];
  }

  return (data as any).results ?? data;
}
