import React from 'react';
import { HandicapResult } from '../../components/results';
import { useAppContext } from '../../state';

/**
 * Results page component
 */
export const ResultsPage = () => {
  const { state } = useAppContext();
  const { handicapResult } = state;

  return (
    <div>
      <HandicapResult result={handicapResult} />
    </div>
  );
};
