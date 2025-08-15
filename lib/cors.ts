export const allowedOrigins = [
  "http://localhost:5173",
  "https://sayantanghosh.in",
  "https://gotodash.sayantanghosh.in",
];

// Helper to build proper CORS headers
export function getCorsHeaders(origin: string, methods?: string): HeadersInit {
  const corsOrigin = allowedOrigins.includes(origin) ? origin : "";
  const headers: HeadersInit = {
    "Access-Control-Allow-Methods":
      typeof methods === "string" && methods?.length ? methods : "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };

  if (corsOrigin) {
    // This is the key fix
    headers["Access-Control-Allow-Origin"] = corsOrigin;
    headers["Access-Control-Allow-Credentials"] = "true";
  } else {
    // Fallback for origins that are not in the allowed list
    headers["Access-Control-Allow-Origin"] = "";
  }

  return headers;
}
