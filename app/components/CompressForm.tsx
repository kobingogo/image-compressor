"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import JSZip from "jszip";

interface CompressFormProps {
  onSubmit: (settings: { quality: number; format: string }) => void;
  isProcessing: boolean;
  currentSettings?: { quality: number; format: string };
  compressedImages?: string[];
}

export default function CompressForm({
  onSubmit,
  isProcessing,
  compressedImages,
  currentSettings
}: CompressFormProps) {
  const [quality, setQuality] = useState(80);
  const [format, setFormat] = useState("webp");
  const { t } = useTranslation();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ quality, format });
  };

  const getQualityColor = (value: number) => {
    if (value >= 80) return "text-green-600";
    if (value >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
      <h3 className="text-xl font-semibold mb-6">{t("compressionSettings")}</h3>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              {t("quality")}
            </label>
            <span
              className={`text-sm font-semibold ${getQualityColor(quality)}`}
            >
              {quality}%
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-primary
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:hover:scale-110"
            />
            <div
              className="absolute h-2 top-0 left-0 rounded-l-lg bg-gradient-to-r from-primary to-secondary"
              style={{ width: `${quality}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>{t('lowerSize')}</span>
            <span>{t('betterQuality')}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("outputFormat")}
          </label>
          <div className="grid grid-cols-4 gap-2">
            {["webp", "jpeg", "png", "avif"].map((fmt) => (
              <button
                key={fmt}
                type="button"
                onClick={() => setFormat(fmt)}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all
                  ${
                    format === fmt
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }
                `}
              >
                {fmt.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className={`
          mt-8 w-full py-3 px-4 rounded-lg text-white font-medium
          transition-all duration-300 transform
          ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-primary to-secondary hover:scale-[1.02] hover:shadow-lg"
          }
        `}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center space-x-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{t("processing")}</span>
          </div>
        ) : (
          <span>{t("compressImage")}</span>
        )}
      </button>
      {Array.isArray(compressedImages) && compressedImages.length > 0 && (
                <button
                  type="button"
                  className="mt-4 w-full py-3 px-4 rounded-lg text-white font-medium bg-gradient-to-r from-primary to-secondary hover:scale-[1.02] hover:shadow-lg"
                  onClick={async () => {
                    const zip = new JSZip();
                    for (let i = 0; i < compressedImages.length; i++) {
                      const response = await fetch(compressedImages[i]);
                      const blob = await response.blob();
                      zip.file(
                        `compressed_image_${i}.${currentSettings?.format}`,
                        blob
                      );
                    }
                    const content = await zip.generateAsync({ type: "blob" });
                    const url = URL.createObjectURL(content);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = t("downloadFileName");
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                >
                  {t("downloadButtonText")}
                </button>
              )}
    </form>
  );
}
