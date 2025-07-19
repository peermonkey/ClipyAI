export interface TimelineScrubberProps {
    duration: number;
    start: number;
    end: number;
    onChange?: (start: number, end: number) => void;
}
export declare function TimelineScrubber({ duration, start, end, onChange }: TimelineScrubberProps): import("react/jsx-runtime").JSX.Element;
