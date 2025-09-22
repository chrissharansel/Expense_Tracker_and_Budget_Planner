import React from "react";

export default function ExpenseSummary({ totalExpenses = 0, budgets = [] }) {
  const totalBudget = budgets.reduce((s, b) => s + (b.limitAmount || 0), 0);
  return (
    <div className="row g-3">
      <div className="col-md-6">
        <div className="summary-item card-compact">
          <h6 className="small-muted">Total spent</h6>
          <h3>₹ {totalExpenses.toFixed(2)}</h3>
        </div>
      </div>
      <div className="col-md-6">
        <div className="summary-item card-compact">
          <h6 className="small-muted">Budget limit (sum)</h6>
          <h3>₹ {totalBudget.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}
