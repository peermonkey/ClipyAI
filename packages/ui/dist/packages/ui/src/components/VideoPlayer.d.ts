export interface VideoPlayerProps {
    src: string;
    poster?: string;
    currentTime?: number;
    aspectRatio?: string;
    className?: string;
    onTimeUpdate?: (time: number) => void;
}
export declare function VideoPlayer({ src, poster, currentTime, aspectRatio, className, onTimeUpdate }: VideoPlayerProps): import("react/jsx-runtime").JSX.Element;
