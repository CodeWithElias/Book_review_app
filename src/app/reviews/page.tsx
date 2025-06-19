'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

type Review ={
  id: number;
  bookTitle: string;
  review: string;
  rating: number;
  mood: string;
  user: {name: string};
};

export default function ReviewsPage(){
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    bookTitle: '',
    rating: '',
    review: '',
    mood: '',
  });

  const router = useRouter();

  const fetchReviews = async () => {
    try{
      const res = await fetch('/api/reviews', {
        credentials: 'include',
      });
      if (!res.ok) {
        if (res.status == 401) router.push('/login');
        throw new Error('Error al cargar reseñas');
      }

      const dato = await res.json();
      setReviews(dato);
    } catch (err) {
      setError('No se pudo cargar las reseñas');
    }
  };



  const handleDelete = async (id: number) => {
    const res = await fetch('/api/reviews/${id}', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok){
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert('No se pudo eliminsar la reseña');
    }
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({...form, [e.target.name]: e.target.value});
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify(form),
    });

    if (res.ok){
      setForm({bookTitle: '', rating: '', review: '', mood: ''});
      fetchReviews();
    } else {
      const dato = await res.json();
      alert(dato.error || 'Error al enviar la reseña');
    }
  };

  useEffect(() =>{
    fetchReviews();  
  },[]);


  return (
    <div>
      <h1>Reseñas de Libros</h1>

      [/* Formulario */]
      <form onSubmit={handleSubmit}>
        <h2>Agregar nueva reseña</h2>
        <input 
        name="bookTitle"
        value={form.bookTitle}
        onChange={handleChange}
        placeholder="Titulo del libro"
        required
        />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          value={form.rating}
          onChange={handleChange}
          placeholder="Puntuación (1-5)"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="review"
          value={form.review}
          onChange={handleChange}
          placeholder="Tu opinión"
          className="w-full p-2 border rounded"
          rows={3}
          required
        />
        <input
          name="mood"
          value={form.mood}
          onChange={handleChange}
          placeholder="¿Cómo te sentiste al leer?"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
        >
          Publicar Reseña
        </button>
      </form>

      {/* Lista de reseñas */}
      {reviews.map((r) =>(
        <div key={r.id}>
          <h2>{r.bookTitle}</h2>
          <p>Por: {r.user.name}</p>
          <p>Valoracion: <strong>{r.rating}/5</strong> | Mood: <em>{r.mood}</em></p>
          <button onClick={() => handleDelete(r.id)}>Eliminar (si sos el autor)</button>
        </div>
      ))}

      {ReviewsPage.length == 0 && !error && (
        <p>No hay reseñas aún.</p>
      )}
    </div>
  )
}