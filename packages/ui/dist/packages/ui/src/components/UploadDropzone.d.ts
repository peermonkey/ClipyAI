export interface UploadDropzoneProps {
    onUploadRequested: (file: File) => Promise<void>;
}
export declare function UploadDropzone({ onUploadRequested }: UploadDropzoneProps): import("react/jsx-runtime").JSX.Element;
