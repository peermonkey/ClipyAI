export interface PlatformPreviewProps {
    platform: 'youtube' | 'tiktok' | 'instagram' | 'twitter';
    videoSrc: string;
    aspectRatio?: string;
    title?: string;
    description?: string;
    hashtags?: string[];
}
export declare function PlatformPreview({ platform, videoSrc, aspectRatio, title, description, hashtags }: PlatformPreviewProps): import("react/jsx-runtime").JSX.Element;
