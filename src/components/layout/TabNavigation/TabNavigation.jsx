import React from 'react';
import { TAB_CONFIG } from '../../../constants';

/**
 * Tab navigation component
 */
export const TabNavigation = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-stone-900/50 rounded-xl shadow-lg p-2 mb-8 border border-amber-900/40">
      <nav className="flex items-center justify-center space-x-1 md:space-x-2">
        {TAB_CONFIG.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-900/30'
                  : 'text-stone-400 hover:bg-stone-800/70'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden md:inline">{tab.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
