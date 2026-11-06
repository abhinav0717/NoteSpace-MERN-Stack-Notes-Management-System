
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const { saveSession } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setBusy(true);

    try {
      const { data } = await api.post('/auth/login', form);

      saveSession(data);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Login failed. Please check your email and password.'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-panel" onSubmit={submit}>
        <h1>Welcome Back!</h1>
        <p>Log in to manage your notes.</p>

        {error && <div className="alert">{error}</div>}

        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>

        <button
          type="submit"
          className="btn full"
          disabled={busy}
        >
          {busy ? 'Logging in...' : 'Login'}
        </button>

        <p className="switch-auth">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </main>
  );
}
