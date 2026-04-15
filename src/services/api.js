// Use VITE_API_URL if set, otherwise:
//   - in dev: use the Vite proxy path (proxied to HTTPS backend in vite.config.js)
//   - in prod: use the full HTTPS backend URL to avoid HTTP→HTTPS redirects
//     that silently convert POST to GET and return a 405
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? '/api/distriforceai'
    : 'https://notif-whatsapp.distriforce.shop/distriforceai');

// Fix code blocks that the backend returns without backtick fences
// e.g.  "php\n$x = 1;\n\n"  →  "```php\n$x = 1;\n```\n\n"
function fixCodeBlocks(text) {
  if (!text) return text;
  const langs =
    'php|javascript|js|typescript|ts|python|py|html|css|sql|bash|sh|json|java|c|cpp|csharp|ruby|go|rust|swift|kotlin|xml|yaml|markdown|md';
  return text.replace(
    new RegExp(`(^|\\n)(${langs})\\n([\\s\\S]+?)\\n(\\n|$)`, 'gi'),
    (_match, pre, lang, code, post) =>
      `${pre}\`\`\`${lang.toLowerCase()}\n${code}\n\`\`\`\n${post}`
  );
}

export async function askAI(question) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  const data = await response.json();
  const raw =
    data?.responseDistriforceIA ||
    data?.response ||
    data?.answer ||
    data?.message ||
    data?.result ||
    JSON.stringify(data);

  return fixCodeBlocks(raw);
}
