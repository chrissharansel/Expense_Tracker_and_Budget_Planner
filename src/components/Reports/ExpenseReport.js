import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import axios from "axios";

export default function ExpenseReport() {
  const user = getCurrentUser();
  const [expenses, setExpenses] = useState([]);
  const API = process.env.REACT_APP_API_URL || "";

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const res = await axios.get(`${API}/api/reports/expenses/${user.id}`);
        setExpenses(res.data || []);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [user, API]);

  if (!user) return <div className="alert alert-info">Login to see reports.</div>;

  const byCategory = expenses.reduce((acc, e) => {
    const key = e.category?.name || "Uncategorized";
    if (!acc[key]) acc[key] = 0;
    acc[key] += (e.amount || 0);
    return acc;
  }, {});

  return (
    <div>
      <h4>Expense Report</h4>
      <div className="card-compact mb-3">
        <h6>Category summary</h6>
        <ul className="list-group">
          {Object.entries(byCategory).map(([k, v]) => (
            <li key={k} className="list-group-item d-flex justify-content-between">
              <span>{k}</span>
              <strong>₹ {v.toFixed(2)}</strong>
            </li>
          ))}
        </ul>
      </div>

      <div className="card-compact">
        <h6>All expenses</h6>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr className="text-muted small">
                <th>Amount</th><th>Description</th><th>Category</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(e => (
                <tr key={e.id}>
                  <td>₹ {(e.amount || 0).toFixed(2)}</td>
                  <td>{e.description}</td>
                  <td>{e.category?.name || "Uncategorized"}</td>
                  <td>{e.date ? new Date(e.date).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
