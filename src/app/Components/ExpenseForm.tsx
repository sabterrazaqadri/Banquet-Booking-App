"use client";

import React, { useState } from 'react';

type ExpenseDetails = {
  amount: number;
  category: string;
  date: Date | null;
};

interface ExpenseFormProps {
  onAddExpense: (expense: ExpenseDetails) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [expenseDetails, setExpenseDetails] = useState<ExpenseDetails>({
    amount: 0,
    category: '',
    date: null,
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpenseDetails((prev) => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setExpenseDetails((prev) => ({
      ...prev,
      date: date,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (expenseDetails.amount <= 0) {
      setError('Amount must be greater than zero.');
      return;
    }
    if (!expenseDetails.category.trim()) {
      setError('Category is required.');
      return;
    }
    if (!expenseDetails.date) {
      setError('Date is required.');
      return;
    }

    // Clear error and submit
    setError(null);
    onAddExpense(expenseDetails);
    setExpenseDetails({ amount: 0, category: '', date: null });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
      <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Add Expense</h3>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label style={{ display: 'block', marginBottom: '4px' }}>Amount:</label>
      <input
        type="number"
        name="amount"
        value={expenseDetails.amount}
        onChange={handleInputChange}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        required
      />

      <label style={{ display: 'block', marginBottom: '4px' }}>Category:</label>
      <input
        type="text"
        name="category"
        value={expenseDetails.category}
        onChange={handleInputChange}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        required
      />

      <label style={{ display: 'block', marginBottom: '4px' }}>Date:</label>
      <input
        type="date"
        name="date"
        value={expenseDetails.date ? expenseDetails.date.toISOString().substring(0, 10) : ''}
        onChange={(e) => handleDateChange(new Date(e.target.value))}
        style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        required
      />

      <button
        type="submit"
        style={{
          padding: '10px 16px',
          backgroundColor: '#3b82f6',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
