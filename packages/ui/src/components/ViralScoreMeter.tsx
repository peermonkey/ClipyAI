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

export function ViralScoreMeter({ score, factors }: ViralScoreMeterProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  // Handle both number and object format for score
  const overallScore = typeof score === 'number' ? score : score.overall;
  const scoreFactors = typeof score === 'object' && !Array.isArray(score) ? [
    { name: 'Engagement', score: score.engagement || 0, weight: 1 },
    { name: 'Trending', score: score.trending || 0, weight: 1 },
    { name: 'Uniqueness', score: score.uniqueness || 0, weight: 1 },
    { name: 'Timing', score: score.timing || 0, weight: 1 }
  ].filter(f => f.score > 0) : factors;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="text-center mb-6">
        <div className={`text-6xl font-bold ${getScoreColor(overallScore)}`}>
          {overallScore}
        </div>
        <div className="text-gray-600 text-sm mt-1">Viral Score</div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
        <div 
          className={`h-3 rounded-full transition-all duration-500 ${getScoreBg(overallScore)}`}
          style={{ width: `${overallScore}%` }}
        />
      </div>

      {scoreFactors && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Score Factors</h4>
          {scoreFactors.map((factor, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{factor.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getScoreBg(factor.score)}`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
                <span className="text-sm font-medium">{factor.score}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}