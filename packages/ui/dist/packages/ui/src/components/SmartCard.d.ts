export interface SmartCardProps {
    id: string;
    thumbUrl: string;
    duration: number;
    onClick?: (id: string) => void;
}
export default function SmartCard({ id, thumbUrl, duration, onClick }: SmartCardProps): import("react/jsx-runtime").JSX.Element;
