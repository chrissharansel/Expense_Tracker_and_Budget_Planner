import React, { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await login(form);
      navigate("/");
    } catch (error) {
      setErr(error?.response?.data || error.message);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card-compact">
          <h4>Welcome back</h4>
          <form onSubmit={submit}>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input required type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input required type="password" className="form-control" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            </div>
            {err && <div className="alert alert-danger">{err}</div>}
            <button className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}
