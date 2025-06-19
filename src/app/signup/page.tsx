'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../login/page'

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Error al registrar');
    } else {
      router.push('/login'); // Redirige tras registro exitoso
    }
  };

  return (
    <div className='registrarse' >
      <form onSubmit={handleSubmit} className='formulario' >
        <h1 >Crear Cuenta</h1>

        <input
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
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
          Registrarse
        </button>
      </form>
    </div>
  );
}