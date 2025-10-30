// Centralized API URL helper
// Normalize BASE by removing any trailing slashes so joining is predictable.
const RAW_BASE = import.meta.env.VITE_BACKEND_URL as string | undefined;
const BASE: string = RAW_BASE ? RAW_BASE.replace(/\/+$/g, '') : '';
if (!BASE) {
  // Warn in dev if VITE_BACKEND_URL isn't set. In production you should set this in your host (Vercel) env.
  // Falling back to relative URLs (same origin) when no BASE is provided.
  console.warn(
    'VITE_BACKEND_URL is not set — using relative API paths (same origin). Set VITE_BACKEND_URL in your environment to target a remote backend.'
  );
}

export const apiUrl = (path: string): string => {
  // normalize incoming path: remove leading slashes
  const p = path ? path.replace(/^\/+/, '') : '';
  if (!p) return BASE || '';
  return BASE ? `${BASE}/${p}` : `/${p}`;
};

export default apiUrl;
