'use client';

import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';

interface ImageUploaderProps {
  onFileSelect: (files: File[]) => void;
}

export default function ImageUploader({ onFileSelect }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const { t } = useTranslation(); 
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles);
        // onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': [],
    },
    maxFiles: 10,
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        relative overflow-hidden rounded-xl border-2 border-dashed p-12 text-center
        transition-all duration-300 ease-in-out
        ${
          isDragging || isDragActive
            ? 'border-secondary bg-secondary/10 scale-[1.02]'
            : 'border-gray-300 hover:border-primary hover:bg-primary/5'
        }
      `}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
    >
      <input {...getInputProps()} />
      <div className="relative z-10 space-y-6">
        <div className="text-6xl transition-transform duration-300 ease-bounce hover:scale-110">
          📸
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-2">
            {isDragging || isDragActive ? t('dropHere') : t('dropImageHere')}
          </h2>
          <p className="text-gray-500">
            {t('or')} <span className="text-primary hover:underline">{ t('clickToSelect')}</span> { t('file')}
          </p>
          <p className="mt-2 text-sm text-gray-400">
            { t('supportFormats')}
          </p>
        </div>
      </div>
      {(isDragging || isDragActive) && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse" />
      )}
    </div>
  );
}