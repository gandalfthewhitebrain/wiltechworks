// app/articles/[slug]/page.tsx
export const revalidate = 60;

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Article page test</h1>
      <p>Slug from URL: <strong>{params.slug}</strong></p>
      <p>If you can see this, the route is fine and the error was in the Drupal fetch code.</p>
    </main>
  );
}
