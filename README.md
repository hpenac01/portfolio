# Portfolio Template (ES/EN)

Plantilla de portfolio personal lista para adaptar con tus propios datos.

## Que editar en cada caso

- **Nombre, enlaces y datos de contacto**: `index.html`
  - Logo/nombre en cabecera.
  - Botones de LinkedIn, GitHub y email.
  - Footer con tu nombre.
- **Textos generales EN/ES (hero, about, education, contacto, etc.)**: `src/js/app.js`
  - Busca los placeholders entre corchetes (`[ ... ]`) y sustituyelos por tus datos.
- **Proyectos profesionales (cards simples)**: `src/data/projects.json`
- **Proyectos personales (cards + detalle completo)**:
  - Lista de archivos cargados: `src/data/personal-projects/projects/manifest.json`
  - Contenido de cada proyecto: `src/data/personal-projects/projects/*.json`
- **Certificaciones**: `src/data/certifications.json`
- **Textos UI de proyectos personales (EN/ES)**: `src/data/personal-projects/config.json`
- **Estilos globales**: `src/styles/main.css`
- **Estilos de pagina detalle**: `src/styles/project-detail.css`

## Assets que suelen cambiar

- Foto de perfil: `assets/profile.jpeg`
- Favicon: `assets/favicon.svg`
- Diplomas/certificados: `assets/certifications/*`
- Capturas de proyectos personales: `assets/projects/<project-id>/*`

> Importante: en cada proyecto personal, el campo `id` debe coincidir con la carpeta de screenshots en `assets/projects/<id>/`.

## Como anadir un proyecto personal nuevo

1. Crea un JSON en `src/data/personal-projects/projects/` (por ejemplo `my-new-project.json`).
2. Agrega ese archivo al array `projects` en `src/data/personal-projects/projects/manifest.json`.
3. Crea la carpeta `assets/projects/<id>/` y mete tus capturas.
4. En `demo[]`, usa `file` con el nombre de cada imagen.

## Desarrollo local

Proyecto estatico (HTML/CSS/JS). Recomendado usar servidor local para `fetch` de JSON:

```bash
python3 -m http.server 8080
```

Abrir [http://localhost:8080](http://localhost:8080).

## Deploy en GitHub Pages

Este repositorio ya incluye workflow: `.github/workflows/deploy-pages.yml`.

Pasos:

1. Sube el repo a GitHub.
2. Ve a `Settings` -> `Pages`.
3. En `Build and deployment`, selecciona `GitHub Actions`.
4. Haz push a tu rama principal.

URL final esperada:

- `https://<tu-usuario>.github.io/<tu-repo>/`
