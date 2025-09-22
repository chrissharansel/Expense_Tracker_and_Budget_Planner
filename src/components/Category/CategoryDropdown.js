import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../services/authService";
import { getCategories } from "../../services/categoryService";

export default function CategoryDropdown({ selectedCategory, onCategoryChange, refreshTrigger }) {
  const user = getCurrentUser();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      if (!user) return;
      try {
        const res = await getCategories(user.id);
        setCategories(res.data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    }
    loadCategories();
  }, [user, refreshTrigger]);

  return (
    <select required value={selectedCategory} onChange={e => onCategoryChange(e.target.value)} className="form-control">
      <option value="">Select Category</option>
      {categories.map(c => (
        <option key={c.id} value={c.id}>{c.name}</option>
      ))}
    </select>
  );
}
