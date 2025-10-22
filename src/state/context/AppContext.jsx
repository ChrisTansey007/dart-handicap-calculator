import React, { createContext, useContext, useReducer } from 'react';
import { appReducer } from '../reducers/appReducer';
import { initialState } from '../initialState';

/**
 * Application context
 */
const AppContext = createContext();

/**
 * AppContext provider component
 */
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook to use app context
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
