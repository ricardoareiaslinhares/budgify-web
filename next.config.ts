/** @type {import('next').NextConfig} */
const nextConfig = {
     eslint: {
    ignoreDuringBuilds: true,
  },
  
/*  async rewrites() {
    return [
      {
        source: "/api/transactions",
        destination: "http://77.54.1.149:6580/gateway/transactions/superadmin/stats",
      },
      {
        source: "/api/users",
        destination: "http://77.54.1.149:6580/gateway/accounts/superadmin/user",
      },
      {
        source: "/api/user",
        destination: "http://77.54.1.149:6580/gateway/accounts/user",
      },
      {
        source: "/api/user/deactivate",
        destination: "http://77.54.1.149:6580/gateway/accounts/superadmin/user",
      },
      {
        source: "/api/user/activate",
        destination: "http://77.54.1.149:6580/gateway/accounts/superadmin/user",
      },
    ];  
  },*/
};

module.exports = nextConfig;
