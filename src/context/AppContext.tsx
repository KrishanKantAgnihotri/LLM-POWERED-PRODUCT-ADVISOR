import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction, UserQuery, Recommendation } from '../types';

// Initial state
const initialState: AppState = {
  queries: [],
  currentQuery: '',
  isLoading: false,
  recommendations: [],
  error: null,
};

// Reducer function
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_QUERY':
      return {
        ...state,
        currentQuery: action.payload,
        error: null,
      };
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    
    case 'SET_RECOMMENDATIONS':
      return {
        ...state,
        recommendations: action.payload,
        isLoading: false,
        error: null,
      };
    
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    
    case 'ADD_QUERY':
      return {
        ...state,
        queries: [action.payload, ...state.queries].slice(0, 20), // Keep last 20 queries
        currentQuery: '',
      };
    
    case 'CLEAR_RECOMMENDATIONS':
      return {
        ...state,
        recommendations: [],
        error: null,
      };
    
    default:
      return state;
  }
};

// Context type
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Action creators for easier use
export const useAppActions = () => {
  const { dispatch } = useApp();

  return {
    setQuery: (query: string) => dispatch({ type: 'SET_QUERY', payload: query }),
    setLoading: (loading: boolean) => dispatch({ type: 'SET_LOADING', payload: loading }),
    setRecommendations: (recommendations: Recommendation[]) => 
      dispatch({ type: 'SET_RECOMMENDATIONS', payload: recommendations }),
    setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }),
    addQuery: (query: UserQuery) => dispatch({ type: 'ADD_QUERY', payload: query }),
    clearRecommendations: () => dispatch({ type: 'CLEAR_RECOMMENDATIONS' }),
  };
};
