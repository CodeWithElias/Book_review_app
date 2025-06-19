'use client'
import { getUserFromRequest } from "../../../lib/auth";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import './page.css'

type Review ={
  id: number;
  bookTitle: string;
  review: string;
  rating: number;
  mood: string;
  user: {name: string};
};

export default function ReviewsPage(){
  const [userName, setUserName] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
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
    const res = await fetch(`/api/reviews/${id}`, {
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

  useEffect(() => {
    
  },[userName])

  useEffect(() =>{  
    const nombre = localStorage.getItem('userName');
    if (nombre) setUserName(nombre)

      fetchReviews();
  },[]);


  return (
    <div className="reseñas">
      <h1>Reseñas de Libros</h1>

      <button onClick={() => setShowModal(true)}>Agregar Reseña</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Agregar reseña</h2>
            <form onSubmit={handleSubmit} className="reseñas-formulario">
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
                required
              />
              <textarea
                name="review"
                value={form.review}
                onChange={handleChange}
                placeholder="Tu opinión"
                rows={3}
                required
              />
              <input
                name="mood"
                value={form.mood}
                onChange={handleChange}
                placeholder="¿Cómo te sentiste al leer?"
                required
              />
              <div className="modal-actions">
                <button type="submit">Publicar Reseña</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Lista de reseñas */}
      
      <div className="lista-reseñas">
        {reviews.map((r) => (
          <div key={r.id}>
            <h2>{r.bookTitle}</h2>
            <p>{r.user.name}</p>
            <p className="comentario">{r.review}</p>
            <p>
              <strong>{r.rating}/5</strong>
            </p>
            <p>{r.mood}</p>

            {userName === r.user.name && (
              <button onClick={() => handleDelete(r.id)}>Eliminar (si sos el autor)</button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}