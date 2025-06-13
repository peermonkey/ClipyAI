interface Props {
    duration: number;
    start: number;
    end: number;
    onChange?: (start: number, end: number) => void;
}
export default function TimelineScrubber({ duration, start, end, onChange }: Props): import("react/jsx-runtime").JSX.Element;
export {};
