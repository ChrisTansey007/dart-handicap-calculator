import React from 'react';
import { Trophy } from 'lucide-react';
import { Button } from '../../components/common';
import { PlayerSelector, MethodSelector } from '../../components/matchup';
import { useAppContext } from '../../state';
import { selectPlayer1, selectPlayer2, setMethod } from '../../state';

/**
 * Matchup page component
 */
export const MatchupPage = ({ onCalculate }) => {
  const { state, dispatch } = useAppContext();
  const { roster, selectedPlayer1Id, selectedPlayer2Id, selectedMethod } = state;

  const handlePlayer1Change = (playerId) => {
    dispatch(selectPlayer1(playerId));
  };

  const handlePlayer2Change = (playerId) => {
    dispatch(selectPlayer2(playerId));
  };

  const handleMethodChange = (method) => {
    dispatch(setMethod(method));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-stone-200 mb-6 text-center">
          Select Matchup & Method
        </h2>
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <PlayerSelector
            label="Player 1"
            players={roster}
            selectedId={selectedPlayer1Id}
            excludeId={selectedPlayer2Id}
            onChange={handlePlayer1Change}
          />
          <div className="flex items-center justify-center text-stone-500 text-2xl font-bold">
            VS
          </div>
          <PlayerSelector
            label="Player 2"
            players={roster}
            selectedId={selectedPlayer2Id}
            excludeId={selectedPlayer1Id}
            onChange={handlePlayer2Change}
          />
        </div>
      </div>

      <MethodSelector
        selectedMethod={selectedMethod}
        onMethodChange={handleMethodChange}
      />

      {selectedPlayer1Id && selectedPlayer2Id && (
        <div className="text-center pt-4">
          <Button
            variant="primary"
            size="lg"
            icon={Trophy}
            onClick={onCalculate}
            className="transform hover:scale-105"
          >
            Calculate Handicap
          </Button>
        </div>
      )}
    </div>
  );
};
