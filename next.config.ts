import type {NextConfig, Redirect} from "next";

const nextConfig: NextConfig = {
    env: {
        apiHost: "http://localhost:5173",
    },
    sassOptions: {
        silenceDeprecations: ['legacy-js-api'],
    },
    reactStrictMode: false,
    redirects: async () => {
        return [
            {
                source: '/catalogue/pcie',
                destination: '/catalogue/pcie/slots',
                permanent: false,
            },
            {
                source: '/catalogue/m2',
                destination: '/catalogue/m2/slots',
                permanent: false,
            },
            {
                source: '/catalogue/io',
                destination: '/catalogue/io/connectors',
                permanent: false,
            },
            {
                source: '/catalogue/ram',
                destination: '/catalogue/ram/kits',
                permanent: false,
            },
            {
                source: '/catalogue/cpu',
                destination: '/catalogue/cpu/units',
                permanent: false,
            },
            {
                source: '/catalogue/fan',
                destination: '/catalogue/fan/packs',
                permanent: false,
            },
            {
                source: '/catalogue/psu',
                destination: '/catalogue/psu/units',
                permanent: false,
            },
            {
                source: '/catalogue/gpu',
                destination: '/catalogue/gpu/units',
                permanent: false,
            }
        ]
    },
};

export default nextConfig;
