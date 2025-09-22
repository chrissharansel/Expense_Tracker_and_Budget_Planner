import React from "react";

export default function BudgetList({ budgets = [], refresh }) {
  if (!budgets.length) return <div className="text-muted small">No budgets</div>;

  return (
    <ul className="list-group">
      {budgets.map((b) => (
        <li key={b.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{b.category?.name || "Category " + (b.categoryId || "")}</strong>
            <div className="small text-muted">
              From {b.startDate} to {b.endDate}
            </div>
          </div>
          <div>₹ {b.limitAmount}</div>
        </li>
      ))}
    </ul>
  );
}
