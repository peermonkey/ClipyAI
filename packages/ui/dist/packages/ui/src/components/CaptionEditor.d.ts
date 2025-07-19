export interface Caption {
    id: string;
    text: string;
    start?: number;
    end?: number;
    startTime?: number;
    endTime?: number;
    style?: {
        fontSize?: string;
        color?: string;
        backgroundColor?: string;
        position?: 'top' | 'center' | 'bottom';
    };
}
export interface CaptionEditorProps {
    captions: Caption[];
    onCaptionsChange: (captions: Caption[]) => void;
    currentTime?: number;
    duration?: number;
}
export declare function CaptionEditor({ captions, onCaptionsChange, currentTime, duration }: CaptionEditorProps): import("react/jsx-runtime").JSX.Element;
