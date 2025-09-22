import React, { useState } from "react";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await register(form);
      navigate("/login");
    } catch (error) {
      setErr(error?.response?.data || error.message);
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card-compact">
          <h4>Create an account</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input required className="form-control" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
            </div>
            <div className="mb-2">
              <label className="form-label">Email</label>
              <input required type="email" className="form-control" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input required type="password" className="form-control" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
            </div>
            {err && <div className="alert alert-danger">{err}</div>}
            <button className="btn btn-primary">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
