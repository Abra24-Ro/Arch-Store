# Arc Store

E-commerce de moda para mujer, hombre y ninos construido con Next.js, Prisma y PostgreSQL.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Prisma
- PostgreSQL
- Auth.js / NextAuth
- Zustand
- React Hook Form + Zod
- PayPal Sandbox
- Cloudinary

## Requisitos

- Node.js compatible con Next.js 16
- Docker Desktop
- Cuenta/configuracion de PayPal Sandbox
- Cuenta/configuracion de Cloudinary

## Configuracion local

1. Instala dependencias.

```bash
npm install
```

2. Copia el archivo de variables de entorno.

```bash
cp .env.template .env
```

3. Completa las variables requeridas en `.env`.

```env
AUTH_SECRET="replace_with_a_secure_random_secret"
NEXT_PUBLIC_PAYPAL_CLIENT_ID="replace_with_paypal_client_id"
PAYPAL_SECRET="replace_with_paypal_secret"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="replace_with_cloudinary_cloud_name"
CLOUDINARY_API_KEY="replace_with_cloudinary_api_key"
CLOUDINARY_API_SECRET="replace_with_cloudinary_api_secret"
```

4. Levanta PostgreSQL con Docker.

```bash
docker compose up -d
```

5. Ejecuta las migraciones de Prisma.

```bash
npx prisma migrate dev
```

6. Carga datos iniciales.

```bash
npm run seed
```

7. Inicia el servidor de desarrollo.

```bash
npm run dev
```

La app queda disponible en `http://localhost:3000`.

## Scripts

```bash
npm run dev
```

Inicia el servidor de desarrollo.

```bash
npm run build
```

Genera Prisma Client y compila la app para produccion.

```bash
npm run start
```

Inicia la app compilada.

```bash
npm run lint
```

Ejecuta ESLint.

```bash
npm run seed
```

Carga datos iniciales en la base de datos local.

## Deploy

El proyecto esta preparado para desplegarse en Vercel. Configura en Vercel las mismas variables privadas y publicas usadas en `.env`, especialmente:

- `DATABASE_URL`
- `AUTH_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
- `PAYPAL_SECRET`
- `PAYPAL_API_URL`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Notas de desarrollo

- Manten `main` estable porque esta conectado al deploy automatico.
- Trabaja cada mejora en una rama separada.
- Antes de hacer merge, revisa el diff, ejecuta build y prueba manualmente el flujo afectado.
