'use client'

import { useEffect } from "react"

export default function ReviewsPage(){
  useEffect(() =>{

  })

  return (
    <div>
      <h1>Reseñas de Libros</h1>
      [/* Formulario */]
      <form action="">
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
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Publicar Reseña
        </button>
      </form>

      {/* Lista de reseñas */}
      {reviews.map((r) =>(
        <div key={r.id}>
          <h2>{r.bookTitle}</h2>
          <p>Por: {r.user.name}</p>
          <p>Valoracion: <strong>{r.rating}/5</strong> | Mood: <em>{rmood}</em></p>
          <button onClick={() => handleDelete(rid)}>Eliminar (si sos el autor)</button>
        </div>
      ))}

      {ReviewsPage.length == 0 && !error && (
        <p>No hay reseñas aún.</p>
      )}
    </div>
  )
}