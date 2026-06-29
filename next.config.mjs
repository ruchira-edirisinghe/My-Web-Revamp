/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build to plain static HTML/JS in `out/` — deployable to any static host.
  output: 'export',
  // Pin the workspace root to this project (a stray lockfile in the user's home
  // dir otherwise makes Next infer the wrong root).
  outputFileTracingRoot: import.meta.dirname,
  // Static export has no image optimization server; serve images as-is.
  images: { unoptimized: true },
  // Emit `route/index.html` so links work on static hosts without a server rewrite.
  trailingSlash: true,
};

export default nextConfig;
