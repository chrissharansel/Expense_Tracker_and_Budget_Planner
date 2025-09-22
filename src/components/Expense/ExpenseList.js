import React from "react";

export default function ExpenseList({ expenses = [], onDelete, loading }) {
  if (loading) return <div>Loading...</div>;
  if (!expenses.length) return <div className="text-muted">No expenses yet.</div>;

  return (
    <div className="table-responsive">
      <table className="table table-borderless align-middle">
        <thead>
          <tr className="text-muted small">
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Date</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(e => (
            <tr key={e.id}>
              <td>₹ {e.amount}</td>
              <td>{e.description}</td>
              <td>{e.category?.name || "-"}</td>
              <td>{e.date}</td>
              <td className="text-end">
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(e.id)}>
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
