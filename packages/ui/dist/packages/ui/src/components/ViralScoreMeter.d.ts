export interface ViralScoreMeterProps {
    score: number | {
        overall: number;
        engagement?: number;
        trending?: number;
        uniqueness?: number;
        timing?: number;
    };
    factors?: Array<{
        name: string;
        score: number;
        weight: number;
    }>;
}
export declare function ViralScoreMeter({ score, factors }: ViralScoreMeterProps): import("react/jsx-runtime").JSX.Element;
