# Arc Store

Ecommerce de moda para mujer, hombre y niños.

## Tecnologías

Next.js 16 · TypeScript · Tailwind CSS v4 · Framer Motion · Zustand · PostgreSQL

## Correr el proyecto

1. Clona el repositorio e instala dependencias

2. Copia las variables de entorno y configúralas `bash npm install`

3. Levanta la base de datos `bash cp .env.template .env`

4. Correr las migraciones de Prisma `` bashdocker compose up -d`  `npx prisma migrate dev ``

5. Correr el seed `bash npm run seed`

6. Corre el servidor
   `bash npm run dev`

Listo en [http://localhost:3000](http://localhost:3000)
