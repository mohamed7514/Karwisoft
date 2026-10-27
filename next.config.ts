import type { NextConfig } from 'next';

// No static export: the assistant needs server routes (/api/chat) to keep the OpenAI key private.
const config: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
};

export default config;
