import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        apiHost: "http://172.27.128.1:5274",
    }
};

export default nextConfig;
