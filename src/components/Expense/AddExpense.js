import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/authService";
import { getCategories } from "../../services/categoryService";
import { addExpense } from "../../services/expenseService";

export default function AddExpense({ onAdded }) {
  const user = getCurrentUser();
  const [form, setForm] = useState({ amount: "", description: "", date: "", categoryId: "" });
  const [categories, setCategories] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function loadCategories() {
      try {
        if (!user) return;
        const res = await getCategories(user.id);
        setCategories(res.data || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadCategories();
  }, [user]);

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    if (!user) {
      setMsg("Login required");
      return;
    }
    try {
      const dto = {
        amount: parseFloat(form.amount),
        description: form.description,
        date: form.date || new Date().toISOString().slice(0, 10),
        categoryId: Number(form.categoryId),
      };
      await addExpense(user.id, dto);
      setForm({ amount: "", description: "", date: "", categoryId: "" });
      setMsg("Added");
      if (onAdded) onAdded();
    } catch (err) {
      setMsg(err?.response?.data?.message || err.message || "Error adding expense");
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="row g-2">
        <div className="col-sm-4">
          <input required placeholder="Amount" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} className="form-control" type="number" />
        </div>
        <div className="col-sm-4">
          <input placeholder="Date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} type="date" className="form-control" />
        </div>
        <div className="col-sm-4">
          <select required className="form-control" value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })}>
            <option value="">Select Category</option>
            {categories.map(c => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
        </div>
        <div className="col-12 mt-2">
          <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="form-control" />
        </div>
        <div className="col-12 mt-2 d-flex justify-content-between align-items-center">
          <small className="text-muted">Pick a category for the expense</small>
          <div>
            <button className="btn btn-sm btn-success">Add Expense</button>
          </div>
        </div>
        {msg && (<div className="col-12 mt-2"><small className="text-success">{msg}</small></div>)}
      </div>
    </form>
  );
}
