/** @type {import('next').NextConfig} */
const nextConfig = {
  // 开启静态导出，GitHub Pages 必须配置
  output: 'export',
  // 设置 basePath，必须和你的仓库名完全一致！
  basePath: '/drama-talk',
  // 禁用 Next.js 图片优化，静态导出不支持该功能
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
