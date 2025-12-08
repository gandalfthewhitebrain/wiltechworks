// app/api-view/page.tsx
import { fetchDrupalViewAbc123 } from "../../lib/fetchDrupalViewAbc123";

export const dynamic = "force-dynamic";

export default async function ApiViewPage() {
  const rows = await fetchDrupalViewAbc123();

  return (
    <main className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-6">Drupal View: /api/abc123</h1>

      {rows.length === 0 && (
        <p className="text-gray-500">No results found.</p>
      )}

      <ul className="space-y-4">
        {rows.map((row, index) => (
          <li
            key={index}
            className="border rounded-md p-4 shadow-sm bg-white"
          >
            <h2 className="text-lg font-semibold mb-1">
              {row.title || `Item #${index + 1}`}
            </h2>

            {row.created && (
              <p className="text-xs text-gray-500 mb-2">
                {new Date(row.created).toLocaleString()}
              </p>
            )}

            {row.body && (
              <p className="text-sm text-gray-800">
                {row.body}
              </p>
            )}

            <details className="mt-2">
              <summary className="cursor-pointer text-xs text-blue-600">
                Raw data
              </summary>
              <pre className="mt-1 text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                {JSON.stringify(row, null, 2)}
              </pre>
            </details>
          </li>
        ))}
      </ul>
    </main>
  );
}
