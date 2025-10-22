import React, { useState } from 'react';
import { Header, Footer, TabNavigation } from './components/layout';
import { PlayerForm } from './components/player';
import { RosterPage, MatchupPage, ResultsPage, GuidePage } from './pages';
import { useAppContext } from './state';
import { savePlayer, cancelEdit, setHandicapResult } from './state';
import { useHandicapCalculator } from './hooks/useHandicapCalculator';
import { TABS } from './constants';

/**
 * Main application component
 */
function App() {
  const { state, dispatch } = useAppContext();
  const { roster, editingPlayer, selectedPlayer1Id, selectedPlayer2Id, selectedMethod } = state;
  const [activeTab, setActiveTab] = useState(TABS.ROSTER);
  const { calculate } = useHandicapCalculator();

  const handleCalculateHandicap = () => {
    const player1 = roster.find((p) => p.id === selectedPlayer1Id);
    const player2 = roster.find((p) => p.id === selectedPlayer2Id);

    if (player1 && player2) {
      const result = calculate(player1, player2, selectedMethod);
      dispatch(setHandicapResult(result));
      setActiveTab(TABS.RESULTS);
    }
  };

  const handleSavePlayer = (player) => {
    dispatch(savePlayer(player));
  };

  const handleCancelEdit = () => {
    dispatch(cancelEdit());
  };

  const renderPage = () => {
    switch (activeTab) {
      case TABS.ROSTER:
        return <RosterPage />;
      case TABS.MATCHUP:
        return <MatchupPage onCalculate={handleCalculateHandicap} />;
      case TABS.RESULTS:
        return <ResultsPage />;
      case TABS.GUIDE:
        return <GuidePage />;
      default:
        return <RosterPage />;
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen p-4 sm:p-6 lg:p-8 font-sans bg-gradient-to-br from-stone-900 via-zinc-900 to-black">
      {editingPlayer && (
        <PlayerForm
          player={editingPlayer}
          onSave={handleSavePlayer}
          onCancel={handleCancelEdit}
        />
      )}

      <div className="max-w-4xl mx-auto">
        <Header />
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="bg-stone-900/50 p-6 md:p-10 rounded-2xl shadow-2xl border border-amber-900/40 min-h-[400px]">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
