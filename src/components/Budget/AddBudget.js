import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/authService";
import { getCategories } from "../../services/categoryService";
import { addBudget } from "../../services/budgetService";

export default function AddBudget({ onAdded }) {
  const user = getCurrentUser();
  const [form, setForm] = useState({ limitAmount: "", startDate: "", endDate: "", categoryId: "" });
  const [msg, setMsg] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        if (!user) return;
        const res = await getCategories(user.id);
        setCategories(res.data || []);
      } catch (err) {
        console.error(err);
      }
    }
    load();
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
        limitAmount: parseFloat(form.limitAmount),
        startDate: form.startDate,
        endDate: form.endDate,
        categoryId: Number(form.categoryId),
      };
      await addBudget(user.id, dto);
      setMsg("Budget added");
      setForm({ limitAmount: "", startDate: "", endDate: "", categoryId: "" });
      if (onAdded) onAdded();
    } catch (err) {
      setMsg(err?.response?.data?.message || err.message || "Error adding budget");
    }
  }

  return (
    <form onSubmit={submit}>
      <div className="mb-2">
        <input
          required
          placeholder="Limit Amount"
          value={form.limitAmount}
          onChange={(e) => setForm({ ...form, limitAmount: e.target.value })}
          className="form-control"
          type="number"
        />
      </div>
      <div className="mb-2 d-flex gap-2">
        <input
          required
          type="date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="form-control"
        />
        <input
          required
          type="date"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          className="form-control"
        />
      </div>
      <div className="mb-2">
        <select
          required
          className="form-control"
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex justify-content-end">
        <button className="btn btn-sm btn-outline-primary">Add Budget</button>
      </div>
      {msg && <div className="mt-2 small text-success">{msg}</div>}
    </form>
  );
}
