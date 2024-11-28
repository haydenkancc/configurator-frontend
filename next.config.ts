import type {NextConfig, Redirect} from "next";

const nextConfig: NextConfig = {
    env: {
        apiHost: "http://localhost:5274",
    },
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    },
    redirects: async () => {
        return [
            {
                source: '/controllers/pcie',
                destination: '/controllers/pcie/slots',
                permanent: false,
            },
            {
                source: '/controllers/m2',
                destination: '/controllers/m2/slots',
                permanent: false,
            },
            {
                source: '/controllers/io',
                destination: '/controllers/io/connectors',
                permanent: false,
            },
        ]
    },
};

export default nextConfig;
