# Personal project screenshots

Use this structure for demo images:

- `assets/projects/poke-repo-android/log-in-poke-repo.png`
- `assets/projects/poke-repo-android/list-and-search-poke-repo.png`
- `assets/projects/poke-repo-android/pokemon-detail-poke-repo.png`
- `assets/projects/poke-repo-android/my-account-and-favorites-poke-repo.png`
- `assets/projects/poke-repo-android/settings-poke-repo.png`

You can replace `.png` with `.jpg` or `.webp` if you update the corresponding `file` values in:

- `src/data/personal-projects/projects/poke-repo-android.json`

**Shared placeholder** (referenced from several JSON files with `"file": "../in-progress.png"`):

- `assets/projects/in-progress.png`

Used by **self-hosted-teleparty** and **studycoach-ai-tfg** until you add project-specific screenshots under `assets/projects/<id>/`.

**Portfolio Engine** uses an empty `demo` array: the detail page shows a **live demo** message (this site is the implementation) plus an optional CTA from `liveDemoCta` in `portfolio-engine.json`.
