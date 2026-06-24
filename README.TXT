CHAT BOT 

URLS

- Backend en CLOUDFLARE WORKERS
https://chat-api.psaquicc2.workers.dev/
- Endpoint prueba
https://chat-api.psaquicc2.workers.dev/chats/1/mensajes

- Frontend en VERCEL
https://pruebachatbot-ruby.vercel.app/
- Chat de ejemplo
https://pruebachatbot-ruby.vercel.app/chats/1

DESCRIPCION

- Backend: Hono, TypeScript, Clouddflare workers
- DataBase: Neon PostgreSQL Serverless
- Frontend: Next.js, TypeScript
- Estilos: Tailwind CSS
- RunTime: Node.js


FUNCIONALIDADES

- Backend
- GET/chats//Mensajes
- POST/chats//mensajes
- DELETE/mensajes/

- Frontend
- Conversacion tipo WhatsApp
- Mensajes ordenados
- Estados (Loading, Error, Aun no hay mensjaes)

VARIABLES DE ENTORNO

- backend
- crear archivo: backend/.env
- contenido: DATABASE_URL= (tu_db_url)

- Frontend
- crear archivo: frontend/.env.local
- contenido: NEXT_PUBLIC_API_URL= (tu_front_url)

EJECUTAR BACKEND LOCALMENTE

- entrar hasta cd backend
- instalar: npm install
- ejecutar: npm run dev
- api: http://localhost:8787
- ejemplo: http://localhost:8787/chats/1/mensajes

EJECUTAR BACKEND LOCALMENTE

- entrar hasta cd frontend
- instalar: npm install
- ejecutar: npm run dev
- en navegador: http://localhost:3000/chats/1

NOTAS

- URL del backend variable de entorno
- NEXT_PUBLIC_API_URL
- archivos .env* no estan incluidos en el repositorio
- se utilizo NODE.JS

