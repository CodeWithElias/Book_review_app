'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type Review = {
  id: number;
  bookTitle: string;
  review: string;
  rating: number;
  mood: string;
  user: { name: string };
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews', {
        credentials: 'include',
      });

      if (!res.ok) {
        if (res.status === 401) router.push('/login');
        throw new Error('Error al cargar reseñas');
      }

      const data = await res.json();
      setReviews(data);
    } catch (err) {
      setError('No se pudo cargar las reseñas');
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert('No se pudo eliminar la reseña');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Reseñas de Libros</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {reviews.map((r) => (
        <div key={r.id} className="bg-white shadow-md rounded p-4 mb-4 border border-gray-200">
          <h2 className="text-xl font-semibold">{r.bookTitle}</h2>
          <p className="text-sm text-gray-500">Por: {r.user.name}</p>
          <p className="mt-2">{r.review}</p>
          <p className="text-sm mt-1">
            Valoración: <strong>{r.rating}/5</strong> | Mood: <em>{r.mood}</em>
          </p>
          <button
            onClick={() => handleDelete(r.id)}
            className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Eliminar (si sos el autor)
          </button>
        </div>
      ))}

      {reviews.length === 0 && !error && (
        <p className="text-center text-gray-600">No hay reseñas aún.</p>
      )}
    </div>
  );
}