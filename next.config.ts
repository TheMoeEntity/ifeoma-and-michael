import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100],
  },
  // Include Handlebars email templates in the serverless output bundle
  outputFileTracingIncludes: {
    "/api/wishes": ["./lib/emails/blessing.hbs"],
    "/api/rsvp": ["./lib/emails/rsvp.hbs"],
  },
};

export default nextConfig;
