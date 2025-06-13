import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export interface UploadDropzoneProps {
  onUploadRequested: (file: File) => Promise<void>;
}

export function UploadDropzone({ onUploadRequested }: UploadDropzoneProps) {
  const [progress, setProgress] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return;
      const file = acceptedFiles[0];
      setIsUploading(true);
      await onUploadRequested(file);
      setProgress(100);
      setTimeout(() => {
        setProgress(null);
        setIsUploading(false);
      }, 1000);
    },
    [onUploadRequested]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="border-dashed border-2 border-gray-600 p-8 rounded-lg text-center cursor-pointer w-full">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag & drop a video, or click to select</p>
      )}
      {isUploading && progress !== null && (
        <div className="mt-4 w-full h-2 bg-gray-800 rounded overflow-hidden">
          <div className="h-full bg-primary-neon" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
} 