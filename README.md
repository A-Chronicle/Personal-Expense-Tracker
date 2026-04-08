# 💰 Personal Expense Tracker

A beautiful, modern expense tracker with multi-currency support. Track your spending across any currency with a sleek, intuitive interface.

## ✨ Features

- 💱 **Multi-Currency Support** - Track expenses in 12+ currencies with automatic conversion
- 💵 **Monthly Budget Tracking** - Set your budget and visualize spending against it with progress bars and status indicators
- 📊 **Smart Analytics** - See total spending, expense count, and average expense
- 📈 **Budget Variations** - View current month vs. all-time expenses and get status alerts (within budget, approaching limit, over budget)
- 🏷️ **Smart Categories** - 9 categories with emoji icons (Food, Transport, Entertainment, Shopping, Utilities, Health, Housing, Education, Other)
- 🔍 **Easy Filtering** - Filter expenses by category instantly
- 💾 **Export & Import** - Backup and restore your expense data as JSON
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Beautiful Design** - Modern UI with smooth animations and glassmorphism effects
- 🔒 **Private** - All data stored locally, never sent anywhere
- ⚡ **Zero Dependencies** - Pure HTML, CSS, and JavaScript

## 🚀 Quick Start

### Option 1: Open in Browser (Easiest)
```bash
# Just open index.html in your browser!
```

### Option 2: Local Server
```bash
# Python (Mac/Linux)
python -m http.server 8000

# Node.js
npm install
npm start

# Then visit: http://localhost:8000
```

## 📖 How to Use

### Setting Your Monthly Budget

1. Click the **"Edit"** button in the Budget section
2. Enter your **monthly budget amount** (e.g., $2000)
3. Click **"Save Budget"**
4. Your budget is now tracked with a visual progress bar

The budget displays:
- **Budget Limit** - Your total monthly budget
- **Spent So Far** - How much you've spent this month
- **Remaining** - How much money you have left
- **Progress Bar** - Visual representation of spending
- **Status Indicator** - Shows if you're within budget, approaching limit, or over budget

**Budget Status Colors:**
- 🟢 **Green** - Within Budget (0-50% spent)
- 🟡 **Yellow** - Approaching Limit (50-80% spent)
- 🔴 **Red** - Over Budget (100%+ spent)

### Switching Between Current Month & All-Time

Use the dropdown in the Budget section to toggle between:
- **Current Month** - Only expenses from this month
- **All Time** - All your expenses ever

### Adding an Expense
1. Enter **Description** - What did you spend on?
2. Enter **Amount** - How much did you spend?
3. Select **Category** - Choose a category
4. Select **Date** - When did you spend it?
5. Click **"Add Expense"**

### Managing Expenses
- **Change Currency** - Use the dropdown in header to view all expenses in a different currency
- **Filter** - Select a category to see only expenses in that category
- **Delete** - Click "Delete" button next to any expense
- **Export** - Click "📥 Export" to download all expenses as JSON
- **Import** - Click "📤 Import" to restore expenses from a backup file
- **Clear All** - Delete all expenses (with confirmation)

## 🌍 Supported Currencies

| Code | Currency | Flag |
|------|----------|------|
| USD | US Dollar | 🇺🇸 |
| EUR | Euro | 🇪🇺 |
| GBP | British Pound | 🇬🇧 |
| JPY | Japanese Yen | 🇯🇵 |
| INR | Indian Rupee | 🇮🇳 |
| AUD | Australian Dollar | 🇦🇺 |
| CAD | Canadian Dollar | 🇨🇦 |
| CHF | Swiss Franc | 🇨🇭 |
| CNY | Chinese Yuan | 🇨🇳 |
| SGD | Singapore Dollar | 🇸🇬 |
| MXN | Mexican Peso | 🇲🇽 |
| BRL | Brazilian Real | 🇧🇷 |

## 🛠️ Technical Details

### Tech Stack
- **HTML5** - Semantic markup
- **CSS3** - Modern responsive design with gradients and animations
- **Vanilla JavaScript** - No frameworks, no dependencies
- **localStorage API** - Persistent data storage

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

### File Structure
```
├── index.html      - HTML structure
├── styles.css      - Modern styling
├── script.js       - Application logic
├── config.js       - Configuration & currencies
├── package.json    - NPM metadata
└── README.md       - This file
```

## 💾 Data Storage

All your expenses are stored in your browser's **localStorage**. This means:
- ✅ Data persists even after closing the browser
- ✅ All data stays on your device (100% private)
- ✅ No internet required to use the app
- ✅ No servers, no tracking, no data collection

**To backup:** Click "📥 Export" to download your data

**To restore:** Click "📤 Import" to load from a backup file

## 🔧 Customization

### Add a New Currency

Edit `config.js`:

```javascript
CURRENCIES: {
    // ... existing currencies
    AED: { symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
}
```

Then add exchange rate:

```javascript
EXCHANGE_RATES: {
    // ... existing rates
    AED: 3.67,
}
```

### Update Exchange Rates

Edit `config.js` and update the `EXCHANGE_RATES` object with current rates.

```javascript
EXCHANGE_RATES = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    // ... update as needed
}
```

### Add More Categories

Edit `config.js`:

```javascript
CATEGORIES: [
    // ... existing
    { name: 'Travel', emoji: '✈️' },
    { name: 'Books', emoji: '📚' },
]
```

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Expenses not saving | Make sure browser storage is enabled, not in private mode |
| Currency not converting | Refresh the page, check exchange rates are set in config.js |
| Can't export data | Check browser permissions, try different format |
| Data disappeared | Check if you cleared browser data, restore from backup if available |

## 📝 Tips & Best Practices

### For Better Tracking
- Use consistent descriptions (e.g., "Starbucks" every time, not "coffee")
- Categorize properly for accurate filtering
- Add date immediately to avoid confusion

### For Data Safety
- Export your data monthly as backup
- Keep exported files in a safe location
- Before clearing data, export first!

## 📱 Mobile Usage

The app works great on mobile:
- Touch-friendly buttons and inputs
- Responsive layout for all screen sizes
- Works in Safari and Chrome on iPhone/iPad
- Works in Chrome and Firefox on Android

## 🎯 What's New

### v2.0
- ✨ Multi-currency support with real exchange rates
- 💱 Automatic currency conversion
- 📥 Export/Import functionality
- 🎨 Beautiful modern redesign
- 📱 Improved mobile experience
- 📊 Enhanced statistics (average expense)

## 🤔 FAQ

**Q: Is my data safe?**
A: Yes! All data is stored locally in your browser. Nothing is sent to any server.

**Q: Can I use this offline?**
A: Yes! Once loaded, the app works completely offline.

**Q: How many expenses can I track?**
A: As many as your browser's storage allows (~5-10MB), which is typically thousands of expenses.

**Q: Can I sync across devices?**
A: Export from one device and import on another using the export/import feature.

**Q: Can I change currencies later?**
A: Yes! All expenses are stored with their original currency and auto-convert when you change your preferred currency.

## 📊 Project Stats

- **Files:** 6
- **Dependencies:** 0
- **CSS Lines:** 600+
- **JS Lines:** 350+
- **Total Size:** ~30KB
- **Gzipped:** ~10KB

## 📄 License

MIT License - Feel free to use and modify for personal use.

## 🎉 Enjoy!

Start tracking your expenses now! Any questions or suggestions, feel free to add an issue on GitHub.

---

**Made with ❤️ using vanilla web technologies**

*Last updated: April 2024 | Version 2.0.0*
