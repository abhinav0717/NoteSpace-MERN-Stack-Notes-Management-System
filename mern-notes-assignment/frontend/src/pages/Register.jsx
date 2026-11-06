
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
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
      const { data } = await api.post('/auth/register', form);

      saveSession(data);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration Error:', err.response?.data || err);

      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed. Please try again.'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-panel" onSubmit={submit}>
        <h1>Create Account</h1>

        <p>Sign up to start saving your notes.</p>

        {error && <div className="alert">{error}</div>}

        <label>
          Name
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            maxLength={60}
            required
          />
        </label>

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
            placeholder="Create a password"
            minLength={6}
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
          {busy ? 'Creating Account...' : 'Register'}
        </button>

        <p className="switch-auth">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
