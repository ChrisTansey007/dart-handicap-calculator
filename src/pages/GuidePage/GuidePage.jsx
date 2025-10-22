import React from 'react';
import { Info, Calculator, Target, Trophy } from 'lucide-react';

/**
 * Guide page component
 */
export const GuidePage = () => {
  return (
    <div className="bg-stone-900/50 border border-amber-900/50 p-8 rounded-2xl text-stone-300 space-y-6">
      <h2 className="text-3xl font-bold text-stone-200 text-center mb-4">
        How to Use This Calculator
      </h2>
      
      <div className="p-4 bg-amber-900/20 border border-amber-800/30 rounded-lg">
        <h3 className="font-bold text-amber-400 flex items-center mb-2">
          <Info className="h-5 w-5 mr-2" /> The Goal
        </h3>
        <p className="text-amber-200/80">
          The purpose is to give the less-skilled player a starting advantage to
          make the game more competitive and enjoyable for both players.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-stone-200 text-lg">
          <span className="font-mono bg-stone-700/50 px-2 py-1 rounded-md mr-2">
            1
          </span>{' '}
          Manage Your Roster
        </h3>
        <p>
          Start on the "Roster" tab. Add players and their stats. You can edit or
          delete them at any time.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-stone-200 text-lg">
          <span className="font-mono bg-stone-700/50 px-2 py-1 rounded-md mr-2">
            2
          </span>{' '}
          Set Up a Matchup
        </h3>
        <p>
          Go to the "Matchup" tab. Select two players from your roster and choose
          a calculation method.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-stone-200 text-lg">
          <span className="font-mono bg-stone-700/50 px-2 py-1 rounded-md mr-2">
            3
          </span>{' '}
          Calculate & Apply
        </h3>
        <p>
          Click "Calculate Handicap" to see the results. Apply the recommended
          handicap at the start of your game and have fun!
        </p>
      </div>

      <div className="pt-6 border-t border-amber-900/50">
        <h2 className="text-2xl font-bold text-stone-200 mb-6 text-center">
          Formulas Explained
        </h2>
        <div className="space-y-6">
          <div className="bg-stone-800/50 p-4 rounded-lg border border-amber-900/50">
            <h4 className="font-bold text-amber-400 mb-2 flex items-center">
              <Calculator className="h-4 w-4 mr-2" />
              MPR-Based
            </h4>
            <p className="text-sm text-stone-400 mb-3">
              Simple method using only Marks Per Round. Perfect for quick
              calculations.
            </p>
            <div className="bg-stone-900/50 p-3 rounded border border-stone-700 text-xs">
              <p className="font-semibold text-stone-300 mb-1">Formula:</p>
              <p className="text-amber-300 font-mono">
                Handicap = |MPR₁ - MPR₂| × 3.5
              </p>
            </div>
          </div>

          <div className="bg-stone-800/50 p-4 rounded-lg border border-amber-900/50">
            <h4 className="font-bold text-stone-300 mb-2 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Multi-Factor
            </h4>
            <p className="text-sm text-stone-400 mb-3">
              Uses multiple metrics for a more precise handicap.
            </p>
            <div className="bg-stone-900/50 p-3 rounded border border-stone-700 text-xs">
              <p className="font-semibold text-stone-300 mb-1">
                Weighted Skill Formula:
              </p>
              <p className="text-amber-300 font-mono">
                Skill = f(MPR, Close Speed, Accuracy, PPT)
              </p>
              <p className="text-stone-400 mt-1">
                Handicap is based on |Skill₁ - Skill₂|
              </p>
            </div>
          </div>

          <div className="bg-stone-800/50 p-4 rounded-lg border border-amber-900/50">
            <h4 className="font-bold text-amber-400 mb-2 flex items-center">
              <Trophy className="h-4 w-4 mr-2" />
              Advanced Dynamic
            </h4>
            <p className="text-sm text-stone-400 mb-3">
              Includes consistency & win rate for adaptive results.
            </p>
            <div className="bg-stone-900/50 p-3 rounded border border-stone-700 text-xs">
              <p className="font-semibold text-stone-300 mb-1">
                Enhanced Formula:
              </p>
              <p className="text-amber-300 font-mono">
                Base = Multi-Factor Result
              </p>
              <p className="text-amber-300 font-mono">
                Adj = f(Consistency, WinRate)
              </p>
              <p className="text-stone-400 mt-1">Final = Base + Adjustment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
