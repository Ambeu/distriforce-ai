const API_URL =
  import.meta.env.VITE_API_URL || '/api/distriforceai';

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
