export interface Highlight {
    start: number;
    end: number;
    confidence: number;
    type: 'viral' | 'engaging' | 'quotable';
    label: string;
}
export interface TimelineScrubberProps {
    duration: number;
    start: number;
    end: number;
    currentTime?: number;
    highlights?: Highlight[];
    waveform?: number[];
    showWaveform?: boolean;
    showHighlights?: boolean;
    onChange?: (start: number, end: number) => void;
    onSeek?: (time: number) => void;
}
export declare function TimelineScrubber({ duration, start, end, currentTime, highlights, waveform, showWaveform, showHighlights, onChange, onSeek }: TimelineScrubberProps): import("react/jsx-runtime").JSX.Element;
