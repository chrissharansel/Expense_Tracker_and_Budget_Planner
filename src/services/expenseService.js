import axios from "axios";
const API = process.env.REACT_APP_API_URL || "";

export async function getExpenses(userId) {
  const res = await axios.get(`${API}/api/expenses/${userId}`);
  return res.data;
}

export async function addExpense(userId, dto) {
  const res = await axios.post(`${API}/api/expenses/${userId}`, dto);
  return res.data;
}

export async function deleteExpense(id) {
  const res = await axios.delete(`${API}/api/expenses/${id}`);
  return res.data;
}
