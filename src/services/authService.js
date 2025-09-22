import axios from "axios";

const API = process.env.REACT_APP_API_URL || "";

const AUTH_URL = `${API}/api/auth`;

export async function register(user) {
  const res = await axios.post(`${AUTH_URL}/register`, user);
  return res.data;
}

export async function login(credentials) {
  const res = await axios.post(`${AUTH_URL}/login`, credentials);
  const user = res.data;
  if (user && user.id) {
    localStorage.setItem("user", JSON.stringify({ id: user.id, name: user.name, email: user.email }));
  }
  return user;
}

export function logout() {
  localStorage.removeItem("user");
}

export function getCurrentUser() {
  const u = localStorage.getItem("user");
  return u ? JSON.parse(u) : null;
}
