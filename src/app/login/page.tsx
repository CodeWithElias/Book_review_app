'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Error al iniciar sesión');
    } else {
      localStorage.setItem('userName', data.name)
      router.push('/reviews');
    }
  };

  return (
    <div  className='login'>
      <form onSubmit={handleSubmit} className='formulario'>
        <h1 >Iniciar Sesión</h1>

        <input
          name="email"
          type="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p>{error}</p>}

        <button
          type="submit"
        >
          Entrar
        </button>
        
        <button
            onClick={() => router.push('/signup')}
            >
            Registrarse
        </button>

      </form>
    </div>
  );
}