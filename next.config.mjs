/** @type {import('next').NextConfig} */
const nextConfig = {
    // Next.js 15+ 已默认启用 App Router，无需显式声明 appDir 
    serverExternalPackages: ['mongoose', 'next-auth'],// 原 serverComponentsExternalPackages 已重命名
    output: 'standalone' // 优化部署体积（可选）
  };
  
  export default nextConfig;