// App configuration constants
export const APP_CONFIG = {
  // App Information
  APP_NAME: 'AI Product Advisor',
  VERSION: '1.0.0',
  
  // API Configuration
  GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
  
  // UI Configuration
  COLORS: {
    primary: '#2196F3',
    primaryDark: '#1976D2',
    secondary: '#FF5722',
    accent: '#4CAF50',
    background: '#f5f5f5',
    surface: '#fff',
    text: '#333',
    textSecondary: '#666',
    textLight: '#999',
    error: '#F44336',
    warning: '#FF9800',
    success: '#4CAF50',
  },
  
  // Search Configuration
  SEARCH_CONFIG: {
    maxQueryLength: 500,
    maxRecommendations: 5,
    minScoreThreshold: 0.2,
    maxHistoryItems: 20,
  },
  
  // Animation Durations
  ANIMATIONS: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  
  // Layout
  LAYOUT: {
    borderRadius: 12,
    cardPadding: 16,
    screenPadding: 16,
  },
};

// Feature flags for development
export const FEATURE_FLAGS = {
  enableOfflineMode: false,
  enableAdvancedFilters: false,
  enableSocialSharing: false,
  enablePriceTracking: false,
  enableUserReviews: false,
};

// Environment detection
export const ENVIRONMENT = {
  isDevelopment: __DEV__,
  isProduction: !__DEV__,
};
