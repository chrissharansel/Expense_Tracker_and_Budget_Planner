import axios from "axios";
const API = process.env.REACT_APP_API_URL || "";

export async function getCategories(userId) {
  const res = await axios.get(`${API}/api/categories/${userId}`);
  return res;
}

export async function addCategory(userId, category) {
  const res = await axios.post(`${API}/api/categories/${userId}`, category);
  return res;
}

export async function deleteCategory(id) {
  const res = await axios.delete(`${API}/api/categories/${id}`);
  return res;
}
