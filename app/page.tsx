"use client";

import { useState, useEffect } from "react";
import Header from "./components/Header";
import ImageUploader from "./components/ImageUploader";
import CompressForm from "./components/CompressForm";
import ResultsView from "./components/ResultsView";
import "./i18n"; // 引入 i18n 配置

import { useTranslation } from "react-i18next";

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [compressedImages, setCompressedImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSettings, setCurrentSettings] = useState<{
    quality: number;
    format: string;
  }>({ quality: 80, format: "webp" });
  const [stats, setStats] = useState<
    {
      originalSize: number;
      compressedSize: number;
      compressedFormat: string;
      originalFormat: string;
    }[]
  >([]);


  // const [stickyHeight, setStickyHeight] = useState(0);
  useEffect(() => {
    const stickyElement = document.querySelector('#grid-left') as HTMLElement | null;
    const overflowElement = document.querySelector('#grid-right') as HTMLElement | null;
    if (stickyElement && overflowElement) {
// 将 stickyElement 类型断言为 HTMLElement，以访问 offsetHeight 属性
      // setStickyHeight(stickyElement.offsetHeight);
      overflowElement.style.height = `${stickyElement.offsetHeight}px`;
    }
    const resizeObserver = new ResizeObserver(() => {
      if (stickyElement && overflowElement) {
        // setStickyHeight(stickyElement.offsetHeight);
        overflowElement.style.height = `${stickyElement.offsetHeight}px`;
      }
    });
    resizeObserver.observe(stickyElement as HTMLElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  const handleFileSelect = (files: File[]) => {
    setSelectedFiles(files);
    setCompressedImages([]);
    setStats([]);
  };

  const handleCompress = async (settings: {
    quality: number;
    format: string;
  }) => {
    if (selectedFiles.length === 0) return;

    setIsProcessing(true);
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("quality", settings.quality.toString());
    formData.append("format", settings.format);

    try {
      const response = await fetch("/api/compress", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Compression failed");
      const data = await response.json();
      setCompressedImages(data.compressedImages);
      setStats(data.stats);
    } catch (error) {
      console.error("Error compressing images:", error);
    }

    setIsProcessing(false);
  };

  const { t, i18n } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-50">
      <Header i18n={i18n} t={t} />
      <main className="max-w-[1200px] mx-auto p-8">
        <div className="grid gap-8">
          <div className="grid gap-8 md:grid-cols-2">
            <div id="grid-left" className="md:sticky md:top-8 space-y-8">
              <ImageUploader onFileSelect={handleFileSelect} />
              {selectedFiles && (
                <CompressForm
                  onSubmit={(settings) => {
                    handleCompress(settings);
                    setCurrentSettings(settings);
                  }}
                  isProcessing={isProcessing}
                  currentSettings={currentSettings}
                  compressedImages={compressedImages}
                />
              )}
              
            </div>
            <div id="grid-right" className="overflow-y-auto">
              {compressedImages.length > 0 && stats && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold">
                      {t("compressionResults")}
                    </h3>
                  </div>
                  {compressedImages.map((image, index) => (
                    <div
                      className="transition-all duration-500 ease-in-out"
                      key={index}
                    >
                      <ResultsView
                        originalImage={URL.createObjectURL(
                          selectedFiles[index]
                        )}
                        compressedImage={image}
                        stats={stats[index]}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

