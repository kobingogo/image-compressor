// i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      downloadButtonText: "Download All",
      downloadFileName: "compressed_images.zip",
      compressionResults: "Compression Results",
      appTitle: "Image Compressor",
      appDescription:
        "Compress your images without losing quality. Support JPEG, PNG, WebP, and AVIF formats.",
      original: "Original",
      compressed: "Compressed",
      sizeIncrease: "Size Increase",
      sizeReduction: "Size Reduction",
      format: "Format",
      unknown: "Unknown",
      newSize: "New Size",
      fullscreen: "Fullscreen",
      dropHere: "Drop it here!",
      dropImageHere: "Drop your image here",
      clickToSelect: "click to select",
      supportFormats: "Supports JPEG, PNG, and WebP formats",
      compressionSettings: 'Compression Settings',
      quality: 'Quality',
      outputFormat: 'Output Format',
      processing: 'Processing...',
      compressImage: 'Compress Image',
      or: 'or',
      file: 'images',
      lowerSize: 'Lower size',
      betterQuality: 'Better quality',
    },
  },
  zh: {
    translation: {
      downloadButtonText: "下载全部",
      downloadFileName: "压缩图片.zip",
      compressionResults: "压缩结果",
      appTitle: "图片压缩器",
      appDescription: "无损压缩图片，支持 JPEG, PNG, WebP, 和 AVIF 格式。",
      original: "原始",
      compressed: "压缩后",
      sizeIncrease: "大小增加",
      sizeReduction: "大小减小",
      format: "格式",
      unknown: "未知",
      newSize: "新大小",
      fullscreen: "全屏",
      dropHere: "放到这里！",
      dropImageHere: "把图片放到这里",
      clickToSelect: "点击选择",
      supportFormats: "支持 JPEG、PNG 和 WebP 格式",
      compressionSettings: '压缩设置',
      quality: '质量',
      outputFormat: '输出格式',
      processing: '处理中...',
      compressImage: '压缩图片',
      or: '或者',
      file: '图片',
      lowerSize: '更小的大小',
      betterQuality: '更好的质量',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // 默认语言
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
