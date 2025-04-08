'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ResultsViewProps {
  originalImage: string;
  compressedImage: string;
  stats: {
    originalSize: number;
    compressedSize: number;
    compressedFormat: string;
    originalFormat: string;
    message?: string;
  };
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export default function ResultsView({
  originalImage,
  compressedImage,
  stats,
}: ResultsViewProps) {
  const [isHoveringComparison, setIsHoveringComparison] = useState(false);
  const { t } = useTranslation();
  const savingsPercent = (
    ((stats.originalSize - stats.compressedSize) / stats.originalSize) *
    100
  ).toFixed(1);

  const isLarger = stats.compressedSize > stats.originalSize;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  return (
    <div className="space-y-8 mb-4">
      <div className="bg-white rounded-xl shadow-lg p-6">
        
        <div className="flex space-x-4">
          <div className="w-1/2 relative aspect-video rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 cursor-pointer">
              <svg
                className="w-8 h-8 text-white/80 hover:text-white hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                onClick={() => {
                  setSelectedImage(originalImage);
                  setIsModalOpen(true);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
            </div>
            <img
              src={originalImage}
              alt={t('original')}
              className="w-full h-full object-cover"
              
            />
            <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {t('original')}: {formatSize(stats.originalSize)}
            </div>
          </div>
          <div className="w-1/2 relative aspect-video rounded-lg overflow-hidden group hover:bg-black/30">
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 cursor-pointer">
            <div className="flex space-x-4">
              <svg
                className="w-8 h-8 text-white/80 hover:text-white hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                onClick={() => {
                  setSelectedImage(compressedImage);
                  setIsModalOpen(true);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                />
              </svg>
              <svg
                className="w-8 h-8 text-white/80 hover:text-white hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = compressedImage;
                  link.download = `compressed-image.${stats.compressedFormat || 'webp'}`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
          </div>
            <img
              src={compressedImage}
              alt={t('compressed')}
              className="w-full h-full object-cover"
              
            />
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {t('compressed')}: {formatSize(stats.compressedSize)}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div
            className={`${
              isLarger ? 'bg-yellow-50' : 'bg-green-50'
            } rounded-lg p-4 text-center`}
          >
            <p className={`text-sm ${
              isLarger ? 'text-yellow-600' : 'text-green-600'
            } font-medium`}>
              {t(`size${isLarger ? 'Increase' : 'Reduction'}`)}
            </p>
            <p className={`text-2xl font-bold ${
              isLarger ? 'text-yellow-700' : 'text-green-700'
            } mt-1`}>
              {isLarger ? '+' : ''}{savingsPercent}%
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-600 font-medium">{t('format')}</p>
            <p className="text-2xl font-bold text-blue-700 mt-1">
              {stats.compressedFormat || t('unknown')}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 text-center">
            <p className="text-sm text-purple-600 font-medium">{t('newSize')}</p>
            <p className="text-2xl font-bold text-purple-700 mt-1">
              {formatSize(stats.compressedSize)}
            </p>
          </div>
        </div>
      </div>

      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg relative">
            <img src={selectedImage} alt="{t('fullscreen')}" className="max-h-[80vh] max-w-[80vw] object-contain" />
            <button
              className="absolute top-2 right-2 text-white bg-gray-600 rounded-full p-2"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
