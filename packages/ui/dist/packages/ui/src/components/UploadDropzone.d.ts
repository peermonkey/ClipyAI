interface Props {
    onUploadRequested: (file: File) => Promise<void>;
}
export default function UploadDropzone({ onUploadRequested }: Props): import("react/jsx-runtime").JSX.Element;
export {};
