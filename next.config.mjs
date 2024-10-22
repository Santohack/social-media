/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  serverExternalPackages: ["@node-rs/argon2"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent .node files from being bundled on the client side
      config.externals = config.externals || [];
      config.externals.push({
        '@node-rs/argon2': 'commonjs @node-rs/argon2',
      });
    } else {
      // For server-side, exclude node_modules from Webpack bundling
      config.externals.push('@node-rs/argon2');
    }

    // Add a rule to handle .node files on the server
    config.module.rules.push({
      test: /\.node$/,
      use: 'node-loader',
    });

    return config;
  },
};

export default nextConfig;
