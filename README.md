# Hugo Pena Cantonero - Portfolio

Portfolio profesional recruiter-ready (ES/EN) enfocado en Software Engineering, Android Development y QA Automation.

Incluye:
- Landing moderna con modo claro/oscuro
- Internacionalizacion (ingles/espanol)
- Seccion de proyectos profesionales
- Seccion de proyectos personales con rail dinamico
- Pagina de detalle generica por proyecto (`personal-project.html?id=<id>`)
- Contenido de proyectos personales cargado desde JSON

## Demo en produccion

Cuando conectes el repositorio y actives GitHub Pages, la URL sera:

- `https://<tu-usuario>.github.io/<tu-repo>/`

---

## Stack

- HTML5
- CSS3
- JavaScript (vanilla)
- GitHub Actions (deploy Pages)

---

## Estructura del proyecto

```text
.
├── index.html
├── personal-project.html
├── src/
│   ├── data/
│   │   ├── projects.json
│   │   └── personal-projects/
│   │       ├── config.json
│   │       └── projects/
│   │           ├── manifest.json
│   │           ├── streambox-android.json
│   │           ├── qa-automation-lab.json
│   │           └── portfolio-engine.json
│   ├── js/
│   │   ├── app.js
│   │   ├── projects.js
│   │   ├── personal-projects.js
│   │   └── personal-project-detail.js
│   └── styles/
│       ├── main.css
│       └── project-detail.css
├── assets/
│   ├── profile.jpeg
│   └── projects/
│       ├── README.md
│       ├── streambox-android/
│       ├── qa-automation-lab/
│       └── portfolio-engine/
└── .github/workflows/deploy-pages.yml
```

---

## Desarrollo local

Este proyecto es estatico y puedes abrir `index.html` directamente, pero se recomienda servidor local para evitar problemas de `fetch` con JSON:

### Opcion 1 (Python)

```bash
python3 -m http.server 8080
```

Abrir:
- `http://localhost:8080`

### Opcion 2 (VSCode/Cursor Live Server)

- Abre el proyecto
- Ejecuta Live Server sobre `index.html`

---

## Proyectos personales (arquitectura reusable)

La seccion **Personal Projects** y su detalle leen datos desde JSON:

1. `src/data/personal-projects/projects/manifest.json`  
   Lista de archivos de proyectos a cargar.

2. `src/data/personal-projects/projects/<project>.json`  
   Datos completos de cada proyecto (`id`, titulos, descripcion, repo, docs, demo...).

3. `src/data/personal-projects/config.json`  
   Config global de rutas y textos UI (EN/ES).

### Campos clave por proyecto

- `id` (obligatorio, unico)
- `title` / `titleEs`
- `description` / `descriptionEs`
- `repository`
- `technologies` (array)
- `overview` / `overviewEs`
- `documentation.en[]` / `documentation.es[]`
- `demo[]` con:
  - `title` / `titleEs`
  - `caption` / `captionEs`
  - `file` (ej. `01-home.png`)

### Capturas de demo

Se resuelven automaticamente con la ruta:

`assets/projects/<id>/<file>`

Ejemplo:
- `assets/projects/streambox-android/01-home.png`

---

## Internacionalizacion (EN/ES)

- El idioma se controla con toggle en UI.
- Se persiste en `localStorage`.
- Home y detalle respetan el idioma guardado.

---

## Deploy a GitHub Pages

Este repo ya incluye workflow:

- `.github/workflows/deploy-pages.yml`

### Pasos

1. Sube el proyecto a GitHub (`main` branch).
2. En GitHub:
   - `Settings` -> `Pages`
   - `Build and deployment` -> `Source: GitHub Actions`
3. Haz push a `main`.
4. Espera a que termine el workflow `Deploy portfolio to GitHub Pages`.

---

## Personalizacion rapida

- Textos generales: `src/js/app.js`
- Proyectos profesionales: `src/data/projects.json`
- Proyectos personales: `src/data/personal-projects/projects/*.json`
- Config UI reusable: `src/data/personal-projects/config.json`
- Estilos globales: `src/styles/main.css`
- Estilos detalle: `src/styles/project-detail.css`

---

## Licencia

Uso personal. Puedes reutilizar la arquitectura como base de portfolio adaptando el contenido.
