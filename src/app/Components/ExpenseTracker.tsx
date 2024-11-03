// components/ExpenseTracker.tsx
"use client"
import React, { useState } from 'react';

type Expense = {
  date: string;
  category: string;
  amount: number;
};

type Income = {
  date: string;
  description: string;
  amount: number;
};

const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [income, setIncome] = useState<Income[]>([]);
  const [expenseForm, setExpenseForm] = useState({ date: '', category: '', amount: 0 });
  const [incomeForm, setIncomeForm] = useState({ date: '', description: '', amount: 0 });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleExpenseInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setExpenseForm({ ...expenseForm, [name]: name === 'amount' ? parseFloat(value) : value });
  };

  const handleIncomeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIncomeForm({ ...incomeForm, [name]: name === 'amount' ? parseFloat(value) : value });
  };

  const handleExpenseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseForm.date || !expenseForm.category || expenseForm.amount <= 0) {
      setError("Please fill in all fields with valid values.");
      setSuccess(null);
      return;
    }
    setExpenses([...expenses, expenseForm]);
    setExpenseForm({ date: '', category: '', amount: 0 });
    setError(null);
    setSuccess("Expense recorded successfully!");
  };

  const handleIncomeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!incomeForm.date || !incomeForm.description || incomeForm.amount <= 0) {
      setError("Please fill in all fields with valid values.");
      setSuccess(null);
      return;
    }
    setIncome([...income, incomeForm]);
    setIncomeForm({ date: '', description: '', amount: 0 });
    setError(null);
    setSuccess("Income recorded successfully!");
  };

  const totalIncome = income.reduce((sum, entry) => sum + entry.amount, 0);
  const totalExpenses = expenses.reduce((sum, entry) => sum + entry.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <div className='p-4 border border-gray-300 rounded-md mt-4 max-w-2xl mx-auto'>
      <h2 className='text-2xl font-semibold mb-4 text-center'>Expense and Income Tracker</h2>

      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-600 text-center">{success}</p>}

      {/* Expense Form */}
      <div className='flex justify-center'>
        <form onSubmit={handleExpenseSubmit} className='space-y-4 mb-4 w-full md:w-3/4'>
          <h3 className='font-semibold underline text-lg'>Record Expense</h3>
          <div className='flex flex-col md:flex-row items-center'>
            <label className='w-full md:w-1/3'>
              Date:
              <input type="date" name="date" value={expenseForm.date} onChange={handleExpenseInputChange} className='ml-2 border border-black rounded-md p-1 w-full' />
            </label>
            <label className='w-full md:w-1/3 mt-2 md:mt-0 md:ml-4'>
              Category:
              <select name="category" value={expenseForm.category} onChange={handleExpenseInputChange} className='ml-2 border border-black rounded-md p-1 w-full'>
                <option value="">Select Category</option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Workers Salary</option>
                <option value="Supplies">Diesel</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </label>
            <label className='w-full md:w-1/3 mt-2 md:mt-0 md:ml-4'>
              Amount:
              <input type="number" name="amount" value={expenseForm.amount} onChange={handleExpenseInputChange} className='ml-2 border border-black rounded-md p-1 w-full' />
            </label>
          </div>
          <button type="submit" className='w-full md:w-1/3 bg-red-500 text-white py-2 rounded-md mt-4'>Add Expense</button>
        </form>
      </div>

      {/* Income Form */}
      <div className='flex justify-center'>
        <form onSubmit={handleIncomeSubmit} className='space-y-4 mb-4 w-full md:w-3/4'>
          <h3 className='font-semibold underline text-lg'>Record Income</h3>
          <div className='flex flex-col md:flex-row items-center'>
            <label className='w-full md:w-1/3'>
              Date:
              <input type="date" name="date" value={incomeForm.date} onChange={handleIncomeInputChange} className='ml-2 border border-black rounded-md p-1 w-full' />
            </label>
            <label className='w-full md:w-1/3 mt-2 md:mt-0 md:ml-4'>
              Description:
              <input type="text" name="description" value={incomeForm.description} onChange={handleIncomeInputChange} className='ml-2 border border-black rounded-md p-1 w-full' />
            </label>
            <label className='w-full md:w-1/3 mt-2 md:mt-0 md:ml-4'>
              Amount:
              <input type="number" name="amount" value={incomeForm.amount} onChange={handleIncomeInputChange} className='ml-2 border border-black rounded-md p-1 w-full' />
            </label>
          </div>
          <button type="submit" className='w-full md:w-1/3 bg-green-500 text-white py-2 rounded-md mt-4'>Add Income</button>
        </form>
      </div>

      {/* Profit & Loss Summary */}
      <div className='border-t border-gray-300 pt-4 mt-4 text-center'>
        <h3 className='text-2xl font-semibold mb-2'>Profit & Loss Summary</h3>
        <p>Total Income: Rs {totalIncome.toFixed(2)}/=</p>
        <p>Total Expenses: Rs {totalExpenses.toFixed(2)}/=</p>
        <p>Net Profit: Rs {netProfit.toFixed(2)}/=</p>
      </div>
    </div>
  );
};

export default ExpenseTracker;
