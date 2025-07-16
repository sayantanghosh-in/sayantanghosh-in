export const allowedOrigins = [
  "http://localhost:5173",
  "https://gotodash.vercel.app",
];

// Helper to build proper CORS headers
export function getCorsHeaders(origin: string, methods?: string): HeadersInit {
  const corsOrigin = allowedOrigins.includes(origin) ? origin : "";
  return {
    "Access-Control-Allow-Origin": corsOrigin,
    "Access-Control-Allow-Methods":
      typeof methods === "string" && methods?.length ? methods : "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}
