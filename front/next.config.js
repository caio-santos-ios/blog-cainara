/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com"
            },

        ],
    formats: ["image/webp"],
    },
}

module.exports = nextConfig
