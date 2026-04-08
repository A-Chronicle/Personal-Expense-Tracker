/**
 * Global Expense Tracker v2.0
 * Multi-currency expense tracking application
 */

class ExpenseTracker {
    constructor() {
        this.expenses = this.loadExpenses();
        this.currentCurrency = this.loadCurrency();
        this.monthlyBudget = this.loadBudget();
        this.budgetViewMode = 'current'; // 'current' or 'all'
        this.initializeElements();
        this.setupCategories();
        this.setupCurrencies();
        this.attachEventListeners();
        this.setTodayDate();
        this.render();
    }

    // ============ Initialization Methods ============

    initializeElements() {
        // Form elements
        this.form = document.getElementById('expenseForm');
        this.descriptionInput = document.getElementById('description');
        this.amountInput = document.getElementById('amount');
        this.categoryInput = document.getElementById('category');
        this.dateInput = document.getElementById('date');

        // Display elements
        this.expensesList = document.getElementById('expensesList');
        this.totalAmount = document.getElementById('totalAmount');
        this.expenseCount = document.getElementById('expenseCount');
        this.avgAmount = document.getElementById('avgAmount');

        // Budget elements
        this.budgetAmount = document.getElementById('budgetAmount');
        this.budgetSpent = document.getElementById('budgetSpent');
        this.budgetRemaining = document.getElementById('budgetRemaining');
        this.budgetProgressFill = document.getElementById('budgetProgressFill');
        this.budgetPercentage = document.getElementById('budgetPercentage');
        this.budgetStatus = document.getElementById('budgetStatus');
        this.monthSelect = document.getElementById('monthSelect');
        this.editBudgetBtn = document.getElementById('editBudgetBtn');

        // Filter and currency
        this.categoryFilter = document.getElementById('categoryFilter');
        this.currencySelect = document.getElementById('currencySelect');

        // Action buttons
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.importFile = document.getElementById('importFile');

        // Modal elements
        this.modal = document.getElementById('modal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalMessage = document.getElementById('modalMessage');
        this.modalCancel = document.getElementById('modalCancel');
        this.modalConfirm = document.getElementById('modalConfirm');

        // Budget modal elements
        this.budgetModal = document.getElementById('budgetModal');
        this.budgetInput = document.getElementById('budgetInput');
        this.budgetCancel = document.getElementById('budgetCancel');
        this.budgetSave = document.getElementById('budgetSave');
        this.budgetSymbol = document.getElementById('budgetSymbol');
    }

    setupCategories() {
        const categorySelect = this.categoryInput;
        const filterSelect = this.categoryFilter;

        CONFIG.CATEGORIES.forEach((category) => {
            const option = document.createElement('option');
            option.value = category.name;
            option.textContent = `${category.emoji} ${category.name}`;
            categorySelect.appendChild(option);

            const filterOption = document.createElement('option');
            filterOption.value = category.name;
            filterOption.textContent = `${category.emoji} ${category.name}`;
            filterSelect.appendChild(filterOption);
        });
    }

    setupCurrencies() {
        const currencySelect = this.currencySelect;
        currencySelect.innerHTML = '';

        Object.entries(CONFIG.CURRENCIES).forEach(([code, data]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = `${data.flag} ${code} - ${data.name}`;
            currencySelect.appendChild(option);
        });

        currencySelect.value = this.currentCurrency;
    }

    attachEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleAddExpense(e));
        this.categoryFilter.addEventListener('change', () => this.render());
        this.currencySelect.addEventListener('change', (e) => this.handleCurrencyChange(e));
        this.exportBtn.addEventListener('click', () => this.exportData());
        this.importBtn.addEventListener('click', () => this.importFile.click());
        this.importFile.addEventListener('change', (e) => this.handleImport(e));
        this.clearBtn.addEventListener('click', () => this.showClearConfirmation());
        this.modalCancel.addEventListener('click', () => this.closeModal());
        this.modalConfirm.addEventListener('click', () => this.executeModalAction());

        // Budget listeners
        this.editBudgetBtn.addEventListener('click', () => this.showBudgetModal());
        this.budgetCancel.addEventListener('click', () => this.closeBudgetModal());
        this.budgetSave.addEventListener('click', () => this.saveBudget());
        this.monthSelect.addEventListener('change', (e) => this.handleBudgetViewChange(e));
        this.budgetInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveBudget();
        });
    }

    setTodayDate() {
        const today = new Date().toISOString().split('T')[0];
        this.dateInput.value = today;
        this.dateInput.max = today;
    }

    // ============ Currency Methods ============

    handleCurrencyChange(e) {
        this.currentCurrency = e.target.value;
        this.saveCurrency();
        this.budgetSymbol.textContent = this.getCurrencySymbol();
        this.render();
    }

    saveCurrency() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.CURRENCY, this.currentCurrency);
    }

    loadCurrency() {
        return localStorage.getItem(CONFIG.STORAGE_KEYS.CURRENCY) || CONFIG.DEFAULT_CURRENCY;
    }

    getCurrencySymbol() {
        return CONFIG.CURRENCIES[this.currentCurrency].symbol;
    }

    formatAmount(amount) {
        const symbol = this.getCurrencySymbol();
        const formatted = formatCurrencyAmount(amount, this.currentCurrency);
        return `${symbol}${formatted}`;
    }

    // ============ Budget Methods ============

    loadBudget() {
        const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.BUDGET);
        return stored ? parseFloat(stored) : 2000; // Default $2000
    }

    saveBudget() {
        const amount = parseFloat(this.budgetInput.value);
        if (!amount || amount <= 0) {
            alert('Please enter a valid budget amount');
            return;
        }
        // Convert from current currency back to USD (base currency) before saving
        const baseAmount = convertCurrency(
            amount,
            this.currentCurrency,
            CONFIG.DEFAULT_CURRENCY
        );
        this.monthlyBudget = baseAmount;
        localStorage.setItem(CONFIG.STORAGE_KEYS.BUDGET, baseAmount.toString());
        this.closeBudgetModal();
        this.render();
    }

    showBudgetModal() {
        // Convert budget from USD to current currency for display
        const budgetInCurrentCurrency = convertCurrency(
            this.monthlyBudget,
            CONFIG.DEFAULT_CURRENCY,
            this.currentCurrency
        );
        this.budgetInput.value = budgetInCurrentCurrency.toFixed(2);
        this.budgetSymbol.textContent = this.getCurrencySymbol();
        this.budgetModal.classList.remove('hidden');
        this.budgetInput.focus();
    }

    closeBudgetModal() {
        this.budgetModal.classList.add('hidden');
    }

    handleBudgetViewChange(e) {
        this.budgetViewMode = e.target.value;
        this.render();
    }

    getBudgetSpent() {
        if (this.budgetViewMode === 'current') {
            return this.getCurrentMonthSpent();
        }
        return this.calculateTotal();
    }

    getCurrentMonthSpent() {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        return this.expenses.reduce((sum, expense) => {
            const expenseDate = new Date(expense.date + 'T00:00:00');
            if (expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
                const convertedAmount = convertCurrency(
                    expense.amount,
                    expense.currency,
                    this.currentCurrency
                );
                return sum + convertedAmount;
            }
            return sum;
        }, 0);
    }

    updateBudgetDisplay() {
        const budgetInCurrentCurrency = convertCurrency(
            this.monthlyBudget,
            CONFIG.DEFAULT_CURRENCY,
            this.currentCurrency
        );

        const spent = this.getBudgetSpent();
        const remaining = budgetInCurrentCurrency - spent;
        const percentage = (spent / budgetInCurrentCurrency) * 100;

        // Update display values
        this.budgetAmount.textContent = this.formatAmount(budgetInCurrentCurrency);
        this.budgetSpent.textContent = this.formatAmount(spent);
        this.budgetRemaining.textContent = this.formatAmount(remaining);
        this.budgetPercentage.textContent = `${Math.round(percentage)}% Used`;

        // Update progress bar
        const progressPercent = Math.min(percentage, 100);
        this.budgetProgressFill.style.width = `${progressPercent}%`;

        // Update status indicator
        if (percentage <= 50) {
            this.budgetStatus.textContent = '✅ Within Budget';
            this.budgetStatus.className = 'budget-status';
        } else if (percentage <= 80) {
            this.budgetStatus.textContent = '⚠️ Approaching Limit';
            this.budgetStatus.className = 'budget-status warning';
        } else if (percentage < 100) {
            this.budgetStatus.textContent = '⚠️ Almost Over';
            this.budgetStatus.className = 'budget-status warning';
        } else {
            this.budgetStatus.textContent = '❌ Over Budget';
            this.budgetStatus.className = 'budget-status danger';
        }
    }

    // ============ Expense Management ============

    handleAddExpense(e) {
        e.preventDefault();

        const expense = {
            id: Date.now(),
            description: this.descriptionInput.value.trim(),
            amount: parseFloat(this.amountInput.value),
            category: this.categoryInput.value,
            date: this.dateInput.value,
            currency: this.currentCurrency,
        };

        if (!expense.description || !expense.amount || !expense.category || !expense.date) {
            this.showAlert('Please fill in all fields', 'error');
            return;
        }

        if (expense.amount <= 0) {
            this.showAlert('Amount must be greater than 0', 'error');
            return;
        }

        this.expenses.push(expense);
        this.saveExpenses();
        this.render();
        this.resetForm();
        this.showAlert('Expense added successfully!', 'success');
    }

    deleteExpense(id) {
        const expense = this.expenses.find((e) => e.id === id);
        if (!expense) return;

        this.expenses = this.expenses.filter((expense) => expense.id !== id);
        this.saveExpenses();
        this.render();
    }

    getFilteredExpenses() {
        const selectedCategory = this.categoryFilter.value;
        return this.expenses.filter((expense) => {
            return !selectedCategory || expense.category === selectedCategory;
        });
    }

    calculateTotal() {
        return this.getFilteredExpenses().reduce((sum, expense) => {
            const convertedAmount = convertCurrency(
                expense.amount,
                expense.currency,
                this.currentCurrency
            );
            return sum + convertedAmount;
        }, 0);
    }

    calculateAverage() {
        const filtered = this.getFilteredExpenses();
        if (filtered.length === 0) return 0;
        return this.calculateTotal() / filtered.length;
    }

    getCategoryEmoji(category) {
        const found = CONFIG.CATEGORIES.find((c) => c.name === category);
        return found ? found.emoji : '📌';
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
    }

    // ============ Rendering ============

    render() {
        this.updateSummary();
        this.updateBudgetDisplay();
        this.renderExpenses();
    }

    updateSummary() {
        const total = this.calculateTotal();
        const average = this.calculateAverage();
        this.totalAmount.textContent = this.formatAmount(total);
        this.avgAmount.textContent = this.formatAmount(average);
        this.expenseCount.textContent = this.expenses.length;
    }

    renderExpenses() {
        const filteredExpenses = this.getFilteredExpenses();

        if (filteredExpenses.length === 0) {
            this.expensesList.innerHTML = '<p class="empty-state">No expenses yet. Add one to get started!</p>';
            return;
        }

        // Sort by date (newest first)
        const sorted = [...filteredExpenses].sort((a, b) => new Date(b.date) - new Date(a.date));

        this.expensesList.innerHTML = sorted
            .map((expense) => {
                const displayAmount = convertCurrency(
                    expense.amount,
                    expense.currency,
                    this.currentCurrency
                );
                const originalCurrency = CONFIG.CURRENCIES[expense.currency].symbol;

                return `
                    <div class="expense-item">
                        <div class="expense-info">
                            <div class="expense-description">
                                <span>${this.getCategoryEmoji(expense.category)}</span>
                                <div>
                                    <div>${expense.description}</div>
                                    <div class="expense-meta">
                                        ${this.formatDate(expense.date)}
                                        ${expense.currency !== this.currentCurrency ? `(${originalCurrency}${formatCurrencyAmount(expense.amount, expense.currency)})` : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="expense-amount">${this.formatAmount(displayAmount)}</div>
                        <button class="btn-delete" onclick="tracker.deleteExpense(${expense.id})">Delete</button>
                    </div>
                `;
            })
            .join('');
    }

    // ============ Data Management ============

    resetForm() {
        this.form.reset();
        this.setTodayDate();
    }

    saveExpenses() {
        localStorage.setItem(CONFIG.STORAGE_KEYS.EXPENSES, JSON.stringify(this.expenses));
    }

    loadExpenses() {
        try {
            const stored = localStorage.getItem(CONFIG.STORAGE_KEYS.EXPENSES);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading expenses:', error);
            return [];
        }
    }

    // ============ Export/Import ============

    exportData() {
        const dataToExport = {
            version: CONFIG.VERSION,
            exportDate: new Date().toISOString(),
            currency: this.currentCurrency,
            expenses: this.expenses,
        };

        const json = JSON.stringify(dataToExport, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `expense-tracker-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showAlert('Data exported successfully!', 'success');
    }

    handleImport(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);

                if (!Array.isArray(data.expenses)) {
                    throw new Error('Invalid file format');
                }

                // Merge or replace logic
                const shouldMerge = confirm(
                    'Do you want to merge with existing expenses? (Cancel to replace all)'
                );

                if (!shouldMerge) {
                    this.expenses = [];
                }

                this.expenses.push(...data.expenses);
                this.saveExpenses();
                this.render();
                this.showAlert('Data imported successfully!', 'success');
            } catch (error) {
                this.showAlert(`Import failed: ${error.message}`, 'error');
                console.error('Import error:', error);
            }
        };
        reader.readAsText(file);

        // Reset file input
        this.importFile.value = '';
    }

    // ============ Modal & Alerts ============

    showClearConfirmation() {
        this.modalAction = 'clearAll';
        this.modalTitle.textContent = '⚠️ Clear All Expenses';
        this.modalMessage.textContent =
            'Are you sure you want to delete all expenses? This action cannot be undone.';
        this.openModal();
    }

    executeModalAction() {
        if (this.modalAction === 'clearAll') {
            this.expenses = [];
            this.saveExpenses();
            this.render();
            this.showAlert('All expenses cleared!', 'success');
        }
        this.closeModal();
    }

    openModal() {
        this.modal.classList.remove('hidden');
    }

    closeModal() {
        this.modal.classList.add('hidden');
        this.modalAction = null;
    }

    showAlert(message, type = 'info') {
        // Simple alert - can be enhanced with toast notifications
        const styleClass = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
        console.log(`${styleClass} ${message}`);
    }
}

// ============ Initialize App ============

let tracker;
document.addEventListener('DOMContentLoaded', () => {
    tracker = new ExpenseTracker();
});

// Handle visibility changes for periodic data sync
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && tracker) {
        tracker.render();
    }
});
