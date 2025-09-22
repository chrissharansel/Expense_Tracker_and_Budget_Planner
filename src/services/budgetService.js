import axios from "axios";
const API = process.env.REACT_APP_API_URL || "";

export async function getBudgets(userId) {
  const res = await axios.get(`${API}/api/budgets/${userId}`);
  return res.data;
}

export async function addBudget(userId, dto) {
  const res = await axios.post(`${API}/api/budgets/${userId}`, dto);
  return res.data;
}

export async function deleteBudget(id) {
  const res = await axios.delete(`${API}/api/budgets/${id}`);
  return res.data;
}
