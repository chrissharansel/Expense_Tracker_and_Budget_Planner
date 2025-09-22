import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../../services/authService";
import { getCategories, addCategory, deleteCategory } from "../../services/categoryService";

export default function CategoryList() {
  const user = getCurrentUser();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [msg, setMsg] = useState("");

  async function loadCategories() {
    try {
      if (!user) return;
      const res = await getCategories(user.id);
      setCategories(res.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadCategories();
  }, [user]);

  const handleAdd = async () => {
    if (!newCategory.trim()) return;
    try {
      await addCategory(user.id, { name: newCategory.trim(), type: "expense" }); // or correct type
      setNewCategory("");
      setMsg("Added");
      await loadCategories(); // refresh list after adding
    } catch (err) {
      setMsg(err?.response?.data?.message || err.message || "Network Error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete category?")) return;
    try {
      await deleteCategory(id);
      await loadCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card-compact">
          <h4>Manage Categories</h4>
          <div className="d-flex gap-2 mb-3">
            <input
              className="form-control"
              placeholder="New category (e.g. Food)"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleAdd}>Add</button>
          </div>
          {msg && <div className="mb-2 text-success">{msg}</div>}
          <ul className="list-group">
            {categories.map(c => (
              <li key={c.id} className="list-group-item d-flex justify-content-between align-items-center">
                <span>{c.name}</span>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(c.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
