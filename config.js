// Configuration for Global Expense Tracker

const CONFIG = {
  CURRENCIES: {
    USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
    EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺' },
    GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧' },
    JPY: { symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
    INR: { symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
    AUD: { symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
    CAD: { symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
    CHF: { symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
    CNY: { symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
    SGD: { symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬' },
    MXN: { symbol: '$', name: 'Mexican Peso', flag: '🇲🇽' },
    BRL: { symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷' },
  },

  CATEGORIES: [
    { name: 'Food', icon: '◆' },
    { name: 'Transport', icon: '▴' },
    { name: 'Entertainment', icon: '■' },
    { name: 'Shopping', icon: '●' },
    { name: 'Utilities', icon: '✦' },
    { name: 'Health', icon: '✚' },
    { name: 'Housing', icon: '⌂' },
    { name: 'Education', icon: '◇' },
    { name: 'Other', icon: '◈' },
  ],

  STORAGE_KEYS: {
    EXPENSES: 'global_expenses',
    CURRENCY: 'preferred_currency',
    BUDGET: 'monthly_budget',
    SETTINGS: 'expense_tracker_settings',
  },

  DEFAULT_CURRENCY: 'USD',
  VERSION: '2.0.0',
};

// Exchange rates (base: USD) - Update these periodically from an API
const EXCHANGE_RATES = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  INR: 83.12,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.24,
  SGD: 1.35,
  MXN: 17.05,
  BRL: 4.97,
};

// Utility function to convert amount between currencies
function convertCurrency(amount, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) return amount;
  const amountInUSD = amount / EXCHANGE_RATES[fromCurrency];
  return amountInUSD * EXCHANGE_RATES[toCurrency];
}

// Format number based on currency decimals
function formatCurrencyAmount(amount, currency) {
  const decimalPlaces = ['JPY', 'CNY'].includes(currency) ? 0 : 2;
  return parseFloat(amount).toFixed(decimalPlaces);
}
