import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
export default function UploadDropzone({ onUploadRequested }) {
    const [progress, setProgress] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const onDrop = useCallback(async (acceptedFiles) => {
        if (!acceptedFiles.length)
            return;
        const file = acceptedFiles[0];
        setIsUploading(true);
        await onUploadRequested(file);
        setProgress(100);
        setTimeout(() => {
            setProgress(null);
            setIsUploading(false);
        }, 1000);
    }, [onUploadRequested]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (_jsxs("div", { ...getRootProps(), className: "border-dashed border-2 border-gray-600 p-8 rounded-lg text-center cursor-pointer w-full", children: [_jsx("input", { ...getInputProps() }), isDragActive ? (_jsx("p", { children: "Drop the files here ..." })) : (_jsx("p", { children: "Drag & drop a video, or click to select" })), isUploading && progress !== null && (_jsx("div", { className: "mt-4 w-full h-2 bg-gray-800 rounded overflow-hidden", children: _jsx("div", { className: "h-full bg-primary-neon", style: { width: `${progress}%` } }) }))] }));
}
