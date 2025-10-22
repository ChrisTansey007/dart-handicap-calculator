import React from 'react';
import { Calculator, Target, Users } from 'lucide-react';
import { Card } from '../../common/Card/Card';

/**
 * Handicap result display component
 */
export const HandicapResult = ({ result }) => {
  if (!result) {
    return (
      <div className="text-center text-stone-500 py-10">
        Please select and calculate a matchup first.
      </div>
    );
  }

  // Perfect match - no handicap needed
  if (result.type === 'none') {
    return (
      <Card variant="default" className="p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="bg-stone-700/50 rounded-full p-3 mb-4 border border-stone-600">
            <Users className="h-8 w-8 text-stone-300" />
          </div>
          <h3 className="text-2xl font-bold text-stone-200 mb-2">
            Perfect Match! 🎯
          </h3>
          <p className="text-green-400 text-lg">{result.reason}</p>
        </div>
      </Card>
    );
  }

  // Handicap needed
  const { weakerPlayer, type, amount, numbers, explanation } = result;

  return (
    <Card variant="highlight" className="p-8 shadow-2xl">
      <div className="flex flex-col items-center text-center">
        <div className="bg-stone-800/50 rounded-full p-4 mb-4 border-2 border-amber-700/50">
          <Target className="h-10 w-10 text-amber-400" />
        </div>
        
        <h3 className="text-2xl font-bold text-stone-200 mb-3">
          Recommended Handicap
        </h3>
        
        <div className="text-stone-300 mb-4 w-full">
          <p className="font-semibold text-xl mb-2">
            <span className="bg-black/30 px-3 py-1 rounded-lg">
              {weakerPlayer}
            </span>{' '}
            receives:
          </p>
          
          <div className="bg-stone-900/50 rounded-lg p-4 mb-4 border border-amber-900/50">
            {type === 'points' && (
              <p className="text-4xl font-bold text-amber-400">
                {amount} point{amount !== 1 ? 's' : ''}
              </p>
            )}
            {type === 'marks' && (
              <p className="text-3xl font-bold text-amber-400">
                {amount} mark{amount !== 1 ? 's' : ''} on {numbers.join(', ')}
              </p>
            )}
          </div>
        </div>
        
        <div className="bg-stone-900/50 rounded-lg p-4 border border-amber-900/50 w-full">
          <p className="text-sm font-semibold text-stone-200 mb-2">
            <Calculator className="inline h-4 w-4 mr-2" /> Details
          </p>
          <p className="text-sm text-stone-400">{explanation}</p>
        </div>
      </div>
    </Card>
  );
};
