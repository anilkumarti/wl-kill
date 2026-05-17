type GeminiProxyResponse = {
  reply?: string;
  raw?: unknown;
  error?: string;
  message?: string;
  details?: string;
};

type UnknownRecord = Record<string, unknown>;

const getProxyBaseUrl = (): string => {
  const meta = import.meta as unknown as { env?: Record<string, string | undefined> };
  const configured = meta.env?.VITE_GEMINI_PROXY_URL;
  if (!configured || typeof configured !== 'string') return '';
  return configured.replace(/\/+$/, '');
};

const isRecord = (value: unknown): value is UnknownRecord => typeof value === 'object' && value !== null;

const getStringValue = (value: unknown): string | undefined =>
  typeof value === 'string' ? value : undefined;

const getNestedString = (value: unknown, path: Array<string | number>): string | undefined => {
  let current: unknown = value;
  for (const segment of path) {
    if (current == null) return undefined;
    if (typeof segment === 'number') {
      if (!Array.isArray(current) || segment >= current.length) return undefined;
      current = current[segment];
    } else {
      if (!isRecord(current)) return undefined;
      current = current[segment];
    }
  }
  return getStringValue(current);
};

const extractReply = (raw: unknown): string | undefined => {
  if (!raw) return undefined;
  if (isRecord(raw) && typeof raw.reply === 'string') return raw.reply;
  return (
    getNestedString(raw, ['candidates', 0, 'content', 'parts', 0, 'text']) ||
    getNestedString(raw, ['candidates', 0, 'output']) ||
    getNestedString(raw, ['result', 'content']) ||
    getStringValue((raw as UnknownRecord).output) ||
    getStringValue((raw as UnknownRecord).message)
  );
};

const parseJson = <T>(text: string): T | null => {
  try {
    return text ? (JSON.parse(text) as T) : null;
  } catch {
    return null;
  }
};

// --- Reusable validation helpers (exported) ---
// These helpers are used both in the frontend and backend to enforce
// that only fitness-related queries reach the Gemini API. Frontend checks
// provide fast feedback; backend checks are authoritative since clients
// can be modified by users.
export const ALLOWED_KEYWORDS = [
  'fitness', 'workout', 'exercise', 'calorie', 'calories', 'nutrition', 'diet', 'protein',
  'muscle', 'muscle gain', 'fat loss', 'weight loss', 'weight gain', 'bmi', 'gym', 'yoga', 'cardio', 'healthy', 'wellness'
];

export const BLOCKED_CATEGORY_PATTERNS = [
  /\b(programming|code|javascript|python|java|typescript|react|node)\b/i,
  /\b(politics|president|congress|vote|election)\b/i,
  /\b(finance|stock|crypto|bitcoin|ethereum|trading|invest)\b/i,
  /\b(movie|film|actor|actress|tv show|entertainment)\b/i,
  /\b(religion|pray|church|mosque|bible|quran)\b/i,
  /\b(news|breaking news|headline)\b/i,
  /\b(hack|hacking|exploit|vulnerability)\b/i,
];

export const PROMPT_INJECTION_PATTERNS = [
  /ignore (previous|earlier) instructions?/i,
  /disregard (previous|earlier) instructions?/i,
  /forget (your|the) (system|previous) instructions?/i,
  /you are now (chatgpt|gpt|another (ai|model))/i,
  /act as (a |an )?/i,
];

export const getRestrictedResponse = () =>
  'Sorry, I can only help with fitness, nutrition, calories, diet, and exercise-related topics.';

export const sanitizePrompt = (text?: string) => {
  if (!text) return '';
  let p = text.replace(/```[\s\S]*?```/g, '');
  p = p.replace(/<[^>]+>/g, '');
  PROMPT_INJECTION_PATTERNS.forEach((rx) => { p = p.replace(rx, '[redacted]'); });
  p = p.replace(/\s+/g, ' ').trim().slice(0, 2000);
  return p;
};

export const isFitnessQuery = (text?: string) => {
  if (!text) return false;
  const lower = text.toLowerCase();
  for (const rx of BLOCKED_CATEGORY_PATTERNS) if (rx.test(lower)) return false;
  for (const kw of ALLOWED_KEYWORDS) {
    const rx = new RegExp('\\b' + kw.replace(/[-\\/\\^$*+?.()|[\]{}]/g, '\\$&') + '\\b', 'i');
    if (rx.test(lower)) return true;
  }
  if (/\b(calorie|calories|workout|exercise|diet|nutrition|protein|gym|yoga|cardio|bmi)\b/i.test(lower)) return true;
  return false;
};

const postToProxy = async (url: string, prompt: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  const text = await response.text().catch(() => '');
  const body = parseJson<GeminiProxyResponse>(text);
  return { response, body, text };
};

export async function sendToGemini(prompt: string) {
  const trimmedPrompt = prompt?.trim();
  if (!trimmedPrompt) throw new Error('Gemini prompt must not be empty.');

  // Apply client-side sanitization and validation before making network requests
  const sanitized = sanitizePrompt(trimmedPrompt);
  if (!isFitnessQuery(sanitized)) {
    // Return the exact restricted response as required.
    return { reply: getRestrictedResponse(), raw: null } as unknown as { reply: string; raw: unknown };
  }

  const baseUrl = getProxyBaseUrl();
  // Prioritize the local /api/gemini endpoint, then fall back to the configured proxy if any.
  const urls = baseUrl ? ['/api/gemini', `${baseUrl}/api/gemini`] : ['/api/gemini'];

  let lastError: string | null = null;
  for (const url of urls) {
    try {
      // Send the sanitized prompt to the proxy; the proxy will prepend the strict system prompt.
      const { response, body, text } = await postToProxy(url, sanitized);
      if (!response.ok) {
        lastError =
          body?.message ||
          body?.error ||
          body?.details ||
          body?.reply ||
          text ||
          `HTTP ${response.status} ${response.statusText}`;
        continue;
      }

      const reply = body?.reply || extractReply(body?.raw) || extractReply(body);
      if (!reply) {
        lastError = `Gemini proxy returned an unexpected response. ${body?.error ?? body?.details ?? 'No reply found.'}`;
        continue;
      }

      return { reply, raw: body?.raw ?? body };
    } catch (err: unknown) {
      lastError = String(err instanceof Error ? err.message : err);
    }
  }

  throw new Error(`Gemini proxy request failed: ${lastError ?? 'Unknown error'}`);
}
