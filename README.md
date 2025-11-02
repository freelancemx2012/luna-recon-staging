# Luna Recon — Staging cero costo (Starter Pack)
Este paquete incluye:
- `netlify.toml` con headers de seguridad y plugin Next.js.
- `middleware.ts` para proteger el staging con Basic Auth (contraseña en `STAGE_PASSWORD`).
- Función `/.netlify/functions/api-proxy` para no exponer la API key.
- Carpeta `api/` con FastAPI mínima para Cloud Run.
- `.env.example` con variables necesarias.
- `public/robots.txt` para evitar indexación.