# 图像压缩器

## 项目介绍
这是一个基于 React 的图像压缩器项目，支持用户上传图片并对其进行压缩。用户可以选择压缩质量和输出格式，压缩结果将显示在页面上，同时展示原始图片和压缩图片的相关统计信息。

## 功能特性
- 支持上传多张图片（最多 10 张）。
- 支持 JPEG、PNG 和 WebP 格式的图片。
- 用户可以自定义压缩质量和输出格式。
- 实时显示压缩结果和统计信息。

## 安装步骤
1. 确保你已经安装了 Node.js 和 npm。
2. 克隆项目到本地：
```bash
  git clone <项目仓库地址>
```
3. 进入项目目录：
```bash
  cd image-compressor
```
4. 安装项目依赖：
```bash
  npm install
```

## 使用示例
1. 启动开发服务器：
```bash
  npm run dev
```
2. 打开浏览器，访问 `http://localhost:3000`。
3. 在页面上选择要上传的图片。
4. 设置压缩质量和输出格式。
5. 点击压缩按钮，等待压缩完成。
6. 查看压缩结果和统计信息。

## 项目结构
```
image-compressor/
├── .next/
├── app/
│   ├── api/
│   │   └── compress/
│   ├── components/
│   │   ├── CompressForm.tsx
│   │   ├── Header.tsx
│   │   ├── ImageUploader.tsx
│   │   └── ResultsView.tsx
│   ├── globals.css
│   ├── i18n.ts
│   ├── layout.tsx
│   └── page.tsx
├── cursorrules.json
├── next-env.d.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── public/
├── styles/
├── tailwind.config.js
└── tsconfig.json
```

## 注意事项
- 请确保你的网络连接正常，以便能够正常访问 API。
- 压缩过程可能需要一些时间，具体取决于图片的大小和数量。

## 贡献
如果你有任何建议或改进，请随时提交 Pull Request 或 Issue。

## 许可证
本项目采用 [MIT 许可证](LICENSE)。