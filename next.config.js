/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com', 'photo.yupoo.com','localhost',"192.168.0.183", "dmsport-back.vercel.app"],
  },
}

module.exports = nextConfig
