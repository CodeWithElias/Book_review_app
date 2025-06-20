# 📚 Book Review App

Una aplicación fullstack donde los usuarios pueden registrarse, iniciar sesión y publicar reseñas de libros.

---

## 🎯 Objetivo

Desarrollar y desplegar una aplicación que permita a los usuarios:
- Registrarse y autenticarse.
- Crear, ver y eliminar reseñas de libros.
- Visualizar reseñas públicas con detalles como título, autor, puntuación y mood.

---

## 🧱 Tecnologías utilizadas

- **Frontend:** Next.js + React + TypeScript  
- **Estilos:** Css
- **Backend:** Next.js API Routes (TypeScript)  
- **Base de datos:** PostgreSQL (Render)  
- **Autenticación:** JWT (cookies HttpOnly + bcryptjs)  
- **Despliegue:** Vercel (free-tier)  
- **Control de versiones:** GitHub

---

## 🔐 Funcionalidades de autenticación

- Registro con nombre, email y contraseña (`/signup`)
- Inicio de sesión con email y contraseña (`/login`)
- Contraseñas hasheadas con `bcryptjs`
- JWT almacenado en cookies HttpOnly
- Rutas protegidas: `/reviews`

---

## 📖 Funcionalidades de reseñas

- `/reviews`: cualquier usuario logueado puede ver todas las reseñas, puede eliminar si es el autor de la reseña y tambien puede agregar nuevas reseñas.

Cada reseña incluye:
- Título del libro
- Nombre del autor de la reseña
- Calificación (1–5 estrellas)
- Texto de reseña
- Mood (estado de ánimo)
- Botón eliminar (visible solo para el autor)

---

## 🗄 Esquema de la base de datos

### users

| Campo     | Tipo     | Descripción                 |
|-----------|----------|-----------------------------|
| id        | SERIAL   | Clave primaria               |
| name      | TEXT     | Nombre del usuario           |
| email     | TEXT     | Único, no nulo               |
| password  | TEXT     | Hashed con bcrypt            |

### reviews

| Campo       | Tipo       | Descripción                                       |
|-------------|------------|---------------------------------------------------|
| id          | SERIAL     | Clave primaria                                   |
| user_id     | INTEGER    | Foreign key a users(id)                          |
| book_title  | TEXT       | Título del libro                                 |
| rating      | INTEGER    | Valor entre 1 y 5                                 |
| review      | TEXT       | Contenido de la reseña                           |
| mood        | TEXT       | Estado emocional asociado a la lectura           |
| created_at  | TIMESTAMP  | Fecha automática de creación                     |

---

## 🔌 API Endpoints

| Método | Ruta                  | Descripción                          |
|--------|-----------------------|--------------------------------------|
| POST   | `/api/signup`         | Registrar nuevo usuario              |
| POST   | `/api/login`          | Iniciar sesión y devolver JWT        |
| GET    | `/api/reviews`        | Obtener todas las reseñas (auth)     |
| POST   | `/api/reviews`        | Crear una nueva reseña (auth)        |
| DELETE | `/api/reviews/:id`    | Eliminar reseña (auth + dueño)       |

---

## 🧠 Páginas y rutas

- `/signup` → Registro de usuario  
- `/login` → Inicio de sesión  
- `/reviews` → Página principal con todas las reseñas, en esta pagina hay un boton que habre un modal que contiene un formulario para agregar nuevas reseñas.

---

## 💡 Descripción del campo `mood`

En este proyecto el campo `mood` lo estamos usando para definir  **el estado emocional que el lector experimentó durante o después de leer el libro**. Es una forma mas personal y profunda de expresar sobre el libro

Ejemplos:
- "Inspirado"
- "Melancólico"
- "Divertido"
- "Reflexivo"
Estos son algunos de los sentimientos que el lector podria experimetar la leer un libro

---

## 🚀 Instrucciones para levantar el proyecto

### 🔧 Setup local

1. Cloná el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/book-review-app.git
   cd book-review-app
   ```

2. Instalá dependencias:
    ```bash
    npm install
    ```

3. Genera tu clave secreta de jwt:
    ```bash
    [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
    ```   

4. Configura tu .env:
    ```bash
    DATABASE_URL=postgresql://usuario:contraseña@host:puerto/db
    JWT_SECRET=alguna_clave_secreta_segura
    ```

5. Ejecuta las magraciones:
    ```bash
    npx prisma migrate deploy
    ```

6. Ejecuta la app:
    ```bash
    npm run dev
    ```

7. Para ver el estado de la base de datos de forma grafica en Prisma:
    ```bash
    npx prisma studio
    ```

8. Antes de desplegar el proyecto es recomendable ejecutar lo siguiente: 
    ```bash
    npx tsc --noEmit
    ```

---

# 📁 Archivos clave
- **.env** → Variables necesarias para correr el proyecto
- **/pages/api** → Rutas del backend
- **/lib/auth.ts** → Autenticación y validación con JWT
- **app/login** → Conponetes del login
- **app/signup** → Conponentes del registro
- **app/reviews** → Componentes de la visualizacion y creacion y eliminacion de las reseñas

---

# 🐞 Bugs conocidos o trade-offs
- El token no expira aún (mejorable con JWT exp + refresh)
- No se envían notificaciones ni hay paginación
- La eliminación de reseñas no pide confirmación (se puede mejorar)
- Diseño simple (se priorizó funcionalidad por tiempo)

---

# ⏱ Tiempo dedicado
- Planificación y diseño inicial: 1h
- Base de datos y migraciones: 1.5h
- Rutas de autenticación y seguridad: 2h
- Lógica de reseñas: 2h
- Estilos, UX y validaciones: 2h
- Testeo y despliegue: 2h
Total estimado: ~10.5 horas

---

# 🌐 Enlace en vivo
👉 https://book-review-app-ruby.vercel.app/login

---

# Justificacion
- La base de datos y el proyecto en next.js no fue desplegado en railway, ya que no cuento con la capa gratuita debia a proyectos anteriores que he desplegado. En su lugar he usado Render para la base de datos y Vercel para el proyecto
- Para los estilos he usado solo CSS puro, dado que no estoy familiarizado con Tailwind CSS, para poder tener el control de todos los componetes y personalizado he usaso CSS puro.


# 🧠 Reflexión final
Este proyecto fue construido con el objetivo de equilibrar funcionalidad backend robusta con una UI clara y accesible. La inclusión del campo mood ofrece una dimensión emocional poco común en apps de reseñas. Me enfoqué en seguridad, claridad visual y estructura limpia para demostrar capacidades fullstack.

---