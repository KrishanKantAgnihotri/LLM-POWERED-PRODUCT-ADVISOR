// Currency types and exchange rates (in a real app, these would come from an API)
export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number; // Rate from USD
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1.0 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.12 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.79 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 149.50 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 1.36 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 1.55 },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan', rate: 7.24 },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', rate: 5.17 },
  { code: 'MXN', symbol: '$', name: 'Mexican Peso', rate: 17.12 },
];

// Default currency (can be changed by user preference)
let currentCurrency: Currency = SUPPORTED_CURRENCIES[0]; // USD by default

/**
 * Set the current currency for the app
 */
export const setCurrentCurrency = (currencyCode: string): void => {
  const currency = SUPPORTED_CURRENCIES.find(c => c.code === currencyCode);
  if (currency) {
    currentCurrency = currency;
  }
};

/**
 * Get the current currency
 */
export const getCurrentCurrency = (): Currency => {
  return currentCurrency;
};

/**
 * Convert amount from USD to target currency
 */
export const convertCurrency = (usdAmount: number, targetCurrencyCode: string): number => {
  const targetCurrency = SUPPORTED_CURRENCIES.find(c => c.code === targetCurrencyCode);
  if (!targetCurrency) {
    return usdAmount; // Return original if currency not found
  }
  return usdAmount * targetCurrency.rate;
};

/**
 * Format currency with proper localization and symbol
 */
export const formatCurrency = (amount: number, currencyCode?: string): string => {
  const currency = currencyCode 
    ? SUPPORTED_CURRENCIES.find(c => c.code === currencyCode) || currentCurrency
    : currentCurrency;

  // Convert from USD if needed
  const convertedAmount = currency.code === 'USD' 
    ? amount 
    : convertCurrency(amount, currency.code);

  // Get appropriate locale for formatting
  const locale = getLocaleForCurrency(currency.code);

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: currency.code === 'JPY' ? 0 : 2,
      maximumFractionDigits: currency.code === 'JPY' ? 0 : 2,
    }).format(convertedAmount);
  } catch (error) {
    // Fallback formatting if Intl.NumberFormat fails
    const symbol = currency.symbol;
    const formatted = currency.code === 'JPY' 
      ? Math.round(convertedAmount).toLocaleString()
      : convertedAmount.toFixed(2);
    
    return `${symbol}${formatted}`;
  }
};

/**
 * Get appropriate locale for currency formatting
 */
const getLocaleForCurrency = (currencyCode: string): string => {
  const localeMap: Record<string, string> = {
    'USD': 'en-US',
    'INR': 'en-IN',
    'EUR': 'en-DE',
    'GBP': 'en-GB',
    'JPY': 'ja-JP',
    'CAD': 'en-CA',
    'AUD': 'en-AU',
    'CNY': 'zh-CN',
    'BRL': 'pt-BR',
    'MXN': 'es-MX',
  };
  return localeMap[currencyCode] || 'en-US';
};

/**
 * Format currency range (for price ranges)
 */
export const formatCurrencyRange = (minAmount: number, maxAmount: number, currencyCode?: string): string => {
  const minFormatted = formatCurrency(minAmount, currencyCode);
  const maxFormatted = formatCurrency(maxAmount, currencyCode);
  return `${minFormatted} - ${maxFormatted}`;
};

/**
 * Get currency symbol only
 */
export const getCurrencySymbol = (currencyCode?: string): string => {
  const currency = currencyCode 
    ? SUPPORTED_CURRENCIES.find(c => c.code === currencyCode) || currentCurrency
    : currentCurrency;
  return currency.symbol;
};

/**
 * Format price with currency conversion and comparison
 */
export const formatPriceWithComparison = (usdPrice: number): string => {
  if (currentCurrency.code === 'USD') {
    return formatCurrency(usdPrice);
  }
  
  const convertedPrice = formatCurrency(usdPrice);
  const usdFormatted = formatCurrency(usdPrice, 'USD');
  return `${convertedPrice} (${usdFormatted})`;
};

/**
 * Format rating to one decimal place
 */
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

/**
 * Generate random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + '...';
};

/**
 * Format date to readable string
 */
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

/**
 * Get score color based on recommendation score
 */
export const getScoreColor = (score: number): string => {
  if (score >= 0.8) return '#4CAF50'; // Green
  if (score >= 0.6) return '#FF9800'; // Orange
  if (score >= 0.4) return '#FFC107'; // Amber
  return '#F44336'; // Red
};

/**
 * Get score label based on recommendation score
 */
export const getScoreLabel = (score: number): string => {
  if (score >= 0.9) return 'Excellent Match';
  if (score >= 0.8) return 'Great Match';
  if (score >= 0.7) return 'Good Match';
  if (score >= 0.6) return 'Fair Match';
  return 'Possible Match';
};

/**
 * Debounce function for search input
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if a string contains any of the search terms
 */
export const containsSearchTerms = (text: string, searchTerms: string[]): boolean => {
  const lowerText = text.toLowerCase();
  return searchTerms.some(term => lowerText.includes(term.toLowerCase()));
};

/**
 * Extract relevant specifications for display
 */
export const getKeySpecs = (specifications: Record<string, string | number>): Array<{key: string, value: string}> => {
  const keySpecs = ['Weight', 'Screen Size', 'Processor', 'RAM', 'Storage', 'Battery Life', 'Camera'];
  
  return keySpecs
    .filter(key => specifications[key] !== undefined)
    .map(key => ({
      key,
      value: String(specifications[key])
    }))
    .slice(0, 4); // Show only top 4 specs
};

/**
 * Calculate match percentage for display
 */
export const getMatchPercentage = (score: number): number => {
  return Math.round(score * 100);
};
