# Laboratorio Clínico Divino Niño Jesus (Vite + React)

Sitio web profesional, moderno y responsive, preparado para **GitHub** y despliegue en **Vercel** (SPA con React Router).

## Requisitos

- Node.js (LTS recomendado)
- npm

## Instalar y ejecutar (local)

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

## Estructura del proyecto

La estructura principal está en:

- `src/components/Navbar.jsx`
- `src/components/Footer.jsx`
- `src/components/FormularioCita.jsx`
- `src/pages/Home.jsx`
- `src/pages/Nosotros.jsx`
- `src/pages/Servicios.jsx`
- `src/pages/Contacto.jsx`
- `src/App.jsx`
- `src/main.jsx`

Estilos globales (solo paleta indicada):

- `src/styles/global.css`

## Configurar EmailJS (Formulario de Cita)

El formulario de cita usa `@emailjs/browser` y variables de entorno.

1) Crea tu archivo `.env` en la raíz del proyecto (no lo subas a GitHub).

Puedes copiar el ejemplo:

```bash
copy .env.example .env
```

2) Completa tus credenciales en `.env`:

```bash
VITE_EMAILJS_SERVICE_ID=TU_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID=TU_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY=TU_PUBLIC_KEY
```

3) En EmailJS, asegúrate de que tu Template use variables que coincidan con las que enviamos:

- `nombreCompleto`
- `telefono`
- `email`
- `fecha`
- `hora`
- `comentarios`

Notas:

- No se solicita DUI.
- No se solicita tipo de examen.
- No hay sistema de consulta de resultados.

## Subir a GitHub

Desde la raíz del proyecto:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

Luego crea un repositorio en GitHub (vacío) y ejecuta:

```bash
git remote add origin TU_URL_DEL_REPO
git push -u origin main
```

Importante:

- No subas tu `.env`. Usa `.env.example` como plantilla.

## Desplegar en Vercel (sin configuraciones adicionales)

Este repo incluye `vercel.json` con rewrite para SPA, así React Router funciona en rutas como `/servicios`.

Pasos:

1) En Vercel: **New Project** → Importa tu repo de GitHub
2) Framework preset: **Vite**
3) Build Command: `npm run build`
4) Output Directory: `dist`
5) Variables de entorno (Project Settings → Environment Variables):
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
6) Deploy

## Personalización rápida

- Textos y datos de contacto: `src/pages/Contacto.jsx` y `src/components/Footer.jsx`
- Servicios: `src/pages/Servicios.jsx`
- Equipo y narrativa institucional: `src/pages/Nosotros.jsx`
- Hero/CTA: `src/pages/Home.jsx`
