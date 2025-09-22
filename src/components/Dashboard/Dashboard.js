import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import { getExpenses, deleteExpense } from "../../services/expenseService";
import { getBudgets } from "../../services/budgetService";
import ExpenseSummary from "./ExpenseSummary";
import ExpenseList from "../Expense/ExpenseList";
import AddExpense from "../Expense/AddExpense";
import BudgetList from "../Budget/BudgetList";
import AddBudget from "../Budget/AddBudget";

export default function Dashboard() {
  const user = getCurrentUser();
  const [expenses, setExpenses] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchAll() {
    setLoading(true);
    try {
      if (!user) {
        setExpenses([]);
        setBudgets([]);
        setLoading(false);
        return;
      }
      const ex = await getExpenses(user.id);
      const bu = await getBudgets(user.id);
      setExpenses(ex || []);
      setBudgets(bu || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
    // eslint-disable-next-line
  }, []);

  const handleDeleteExpense = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const totalExpenses = expenses.reduce((s, e) => s + (e.amount || 0), 0);

  return (
    <>
      {!user && (
        <div className="alert alert-info">You need to <a href="/login">login</a> to use the dashboard.</div>
      )}

      <div className="row mb-3">
        <div className="col-md-8">
          <div className="card-compact">
            <h5>Dashboard</h5>
            <ExpenseSummary totalExpenses={totalExpenses} budgets={budgets} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-compact">
            <h6 className="mb-2">Quick Actions</h6>
            <AddExpense onAdded={fetchAll} />
            <hr />
            <AddBudget onAdded={fetchAll} />
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-8">
          <div className="card-compact">
            <h6>Recent Expenses</h6>
            <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} loading={loading} />
          </div>
        </div>

        <div className="col-md-4">
          <div className="card-compact">
            <h6>Budgets</h6>
            <BudgetList budgets={budgets} refresh={fetchAll} />
          </div>
        </div>
      </div>
    </>
  );
}
