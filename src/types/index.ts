// Product interface definition
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  specifications: {
    [key: string]: string | number;
  };
  price: number;
  brand: string;
  rating: number;
  reviews: number;
  image?: string;
  tags: string[];
}

// AI Recommendation interface
export interface Recommendation {
  product: Product;
  score: number;
  reasons: string[];
  matchedFeatures: string[];
}

// User query interface
export interface UserQuery {
  id: string;
  query: string;
  timestamp: Date;
  recommendations?: Recommendation[];
}

// App state interface
export interface AppState {
  queries: UserQuery[];
  currentQuery: string;
  isLoading: boolean;
  recommendations: Recommendation[];
  error: string | null;
}

// Action types for state management
export type AppAction = 
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_RECOMMENDATIONS'; payload: Recommendation[] }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_QUERY'; payload: UserQuery }
  | { type: 'CLEAR_RECOMMENDATIONS' };

// Navigation types
export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  ProductDetail: { product: Product };
  History: undefined;
};
