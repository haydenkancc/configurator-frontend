import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    env: {
        apiHost: "http://localhost:5274/",
    },
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    },
    
};

export default nextConfig;
