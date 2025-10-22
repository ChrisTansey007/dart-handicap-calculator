import React from 'react';

/**
 * Application header component
 */
export const Header = () => {
  return (
    <header className="text-center mb-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-600">
        Dart Handicap Calculator
      </h1>
      <p className="mt-3 text-lg text-stone-400">
        Roster-based handicapping for fair and exciting matches.
      </p>
    </header>
  );
};
