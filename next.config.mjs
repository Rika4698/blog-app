/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["res.cloudinary.com",// for uploaded blog images
      "lh3.googleusercontent.com", // for Google login profile pictures 
      'avatars.githubusercontent.com'
          ],
        
      },
};

export default nextConfig;
