const basePath = window.__BASE_PATH__ || "";
const THEME_KEY = "hugo-portfolio-theme";

function applySavedTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  }
}

function handleThemeToggle() {
  document.body.classList.toggle("light");
  const nextTheme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem(THEME_KEY, nextTheme);
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  }
}

applySavedTheme();
document.getElementById("theme-toggle")?.addEventListener("click", handleThemeToggle);

const LANGUAGE_KEY = "hugo-portfolio-language";

function getDetailLanguage() {
  return localStorage.getItem(LANGUAGE_KEY) === "es" ? "es" : "en";
}

function updateLanguageButton() {
  const languageToggle = document.getElementById("language-toggle");
  if (languageToggle) {
    languageToggle.textContent = getDetailLanguage() === "es" ? "ES" : "EN";
  }
}

updateLanguageButton();

let detailConfig = null;
let ui = {
  back: "← Back to personal projects",
  contact: "Contact",
  repository: "Repository",
  documentation: "Documentation",
  visualDemo: "Visual demo",
  notFoundTitle: "Project not found",
  notFoundBody: "The selected project does not exist.",
  demoPlaceholder: "Add screenshot here"
};
let dataBasePath = `${basePath}/src/data/personal-projects/projects`;
let assetsBasePath = `${basePath}/assets/projects`;
let lightboxBound = false;
let lastFocusedImageButton = null;
let resolvedProject;

function getProjectId() {
  const params = new URLSearchParams(window.location.search);
  const queryId = params.get("id");
  if (queryId) return queryId;

  const pathMatch = window.location.pathname.match(/\/personal-project\/([^/?#]+)/);
  return pathMatch ? decodeURIComponent(pathMatch[1]) : "";
}

const projectId = getProjectId();

const projectTitle = document.getElementById("project-title");
const projectOverview = document.getElementById("project-overview");
const projectRepo = document.getElementById("project-repo");
const docTitle = document.getElementById("doc-title");
const docList = document.getElementById("doc-list");
const demoTitle = document.getElementById("demo-title");
const demoGrid = document.getElementById("demo-grid");
const backLink = document.getElementById("back-link");
const contactButton = document.querySelector(".btn.secondary");

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function closeDiplomaLightbox() {
  const lightbox = document.getElementById("image-lightbox");
  const image = document.getElementById("image-lightbox-img");
  if (!lightbox || !image) return;

  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");
  image.src = "";
  image.alt = "";
  document.body.style.removeProperty("overflow");

  if (lastFocusedImageButton) {
    lastFocusedImageButton.focus();
    lastFocusedImageButton = null;
  }
}

function openDiplomaLightbox(src, alt, triggerElement) {
  const lightbox = document.getElementById("image-lightbox");
  const image = document.getElementById("image-lightbox-img");
  if (!lightbox || !image) return;

  image.src = src;
  image.alt = alt || "";
  lightbox.hidden = false;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lastFocusedImageButton = triggerElement || null;

  lightbox.focus();
}

function bindDiplomaLightboxEvents() {
  if (lightboxBound) return;

  const lightbox = document.getElementById("image-lightbox");
  if (!lightbox) return;

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeDiplomaLightbox();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeDiplomaLightbox();
    }
  });

  lightboxBound = true;
}

function bindProjectDetailDemoLightboxDelegation() {
  if (!demoGrid || demoGrid.dataset.demoLightboxBound === "1") return;
  demoGrid.dataset.demoLightboxBound = "1";
  demoGrid.addEventListener("click", event => {
    const button = event.target.closest(".certification-diploma-trigger");
    if (!button || !demoGrid.contains(button)) return;
    const imageSrc = button.getAttribute("data-image-src");
    const imageAlt = button.getAttribute("data-image-alt");
    if (!isNonEmptyString(imageSrc)) return;
    openDiplomaLightbox(imageSrc, imageAlt, button);
  });
}

async function checkAssetExists(url) {
  try {
    const response = await fetch(url, { method: "HEAD", cache: "no-store" });
    if (response.ok) return true;
  } catch (_error) {
    // Ignore and fallback to GET check.
  }

  try {
    const response = await fetch(url, { cache: "no-store" });
    return response.ok;
  } catch (_error) {
    return false;
  }
}

function buildUiFromConfig() {
  if (!detailConfig) return;
  const lang = getDetailLanguage();
  const selectedUi = detailConfig?.ui?.[lang] || detailConfig?.ui?.en || {};
  ui = {
    back: selectedUi.detailBack || "← Back to personal projects",
    contact: selectedUi.detailContact || "Contact",
    repository: selectedUi.detailRepository || "Repository",
    documentation: selectedUi.detailDocumentation || "Documentation",
    visualDemo: selectedUi.detailVisualDemo || "Visual demo",
    notFoundTitle: selectedUi.detailNotFoundTitle || "Project not found",
    notFoundBody:
      selectedUi.detailNotFoundBody || "The selected project does not exist.",
    demoPlaceholder: selectedUi.detailDemoPlaceholder || "Add screenshot here"
  };
}

async function loadProjects() {
  const configResponse = await fetch(
    `${basePath}/src/data/personal-projects/config.json`
  );
  detailConfig = await configResponse.json();
  buildUiFromConfig();

  dataBasePath = `${basePath}/${detailConfig?.paths?.projectsBase || "src/data/personal-projects/projects"}`;
  assetsBasePath = `${basePath}/${detailConfig?.paths?.assetsBase || "assets/projects"}`;

  const manifestResponse = await fetch(`${dataBasePath}/manifest.json`);
  const manifest = await manifestResponse.json();
  const files = Array.isArray(manifest.projects) ? manifest.projects : [];

  const projects = await Promise.all(
    files.map(async file => {
      const response = await fetch(`${dataBasePath}/${file}`);
      return response.json();
    })
  );

  return projects;
}

async function validateProjectForDetail(project) {
  const requiredFields = ["id", "title", "description", "repository"];
  requiredFields.forEach(field => {
    if (!isNonEmptyString(project[field])) {
      console.warn(
        `[personal-project-detail] Missing or invalid "${field}" in project: ${project.id || "unknown"}`
      );
    }
  });

  const demoShots = Array.isArray(project.demo) ? project.demo : [];
  const demoChecks = demoShots.map(async shot => {
    if (!shot.file) return;
    const assetPath = `${assetsBasePath}/${project.id}/${shot.file}`;
    const exists = await checkAssetExists(assetPath);
    if (!exists) {
      console.warn(`[personal-project-detail] Demo asset not found: ${assetPath}`);
    }
  });

  await Promise.all(demoChecks);
}

function createDemoItem(shot, project) {
  const lang = getDetailLanguage();
  const title = lang === "es" ? shot.titleEs || shot.title : shot.title;
  const caption = lang === "es" ? shot.captionEs || shot.caption : shot.caption;

  const container = document.createElement("div");
  const shotCaption = document.createElement("p");
  shotCaption.className = "shot-caption";
  shotCaption.textContent = caption;

  const imagePath =
    shot.image || `${assetsBasePath}/${project.id}/${shot.file || ""}`;

  if (shot.image || shot.file) {
    const figure = document.createElement("figure");
    figure.className = "certification-diploma-wrap";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "certification-diploma-trigger";
    button.setAttribute("data-image-src", imagePath);
    button.setAttribute("data-image-alt", title);
    button.setAttribute("aria-label", title);

    const image = document.createElement("img");
    image.src = imagePath;
    image.alt = title;
    image.className = "certification-diploma";
    image.loading = "lazy";
    image.decoding = "async";
    image.onerror = () => {
      figure.className = "demo-shot";
      figure.textContent = `${ui.demoPlaceholder}: ${title}`;
    };

    button.appendChild(image);
    figure.appendChild(button);
    container.appendChild(figure);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "demo-shot";
    placeholder.textContent = `${ui.demoPlaceholder}: ${title}`;
    container.appendChild(placeholder);
  }

  container.appendChild(shotCaption);
  return container;
}

function createLiveDemoItem(project) {
  const lang = getDetailLanguage();
  const message =
    lang === "es"
      ? project.liveDemoNoteEs || project.liveDemoNote
      : project.liveDemoNote || project.liveDemoNoteEs;

  const container = document.createElement("div");
  container.className = "live-demo-block";
  const demoShot = document.createElement("div");
  demoShot.className = "demo-shot demo-shot-live";
  demoShot.textContent =
    message ||
    (lang === "es"
      ? "Este proyecto es la demo que estas viendo ahora."
      : "This project is the live demo you are currently viewing.");

  container.appendChild(demoShot);

  const cta = project.liveDemoCta;
  if (cta && typeof cta.href === "string" && cta.href.trim()) {
    const link = document.createElement("a");
    const path = cta.href.replace(/^\//, "");
    const hashPart =
      typeof cta.hash === "string" && cta.hash.trim()
        ? `#${cta.hash.replace(/^#/, "")}`
        : "";
    const prefix = basePath.endsWith("/")
      ? basePath.slice(0, -1)
      : basePath;
    link.href = prefix ? `${prefix}/${path}${hashPart}` : `${path}${hashPart}`;
    link.className = "btn primary live-demo-cta";
    link.textContent =
      lang === "es"
        ? cta.labelEs || cta.label || "Ver demo"
        : cta.label || cta.labelEs || "View demo";
    container.appendChild(link);
  }

  return container;
}

function renderNotFound() {
  document.documentElement.lang = getDetailLanguage();
  projectTitle.textContent = ui.notFoundTitle;
  projectOverview.textContent = ui.notFoundBody;
  projectRepo.style.display = "none";
  docTitle.textContent = ui.documentation;
  demoTitle.textContent = ui.visualDemo;
  backLink.textContent = ui.back;
  backLink.href = `${basePath}/index.html#personal-projects`;
  contactButton.href = `${basePath}/index.html#contact`;
  contactButton.textContent = ui.contact;
}

function renderProjectDetail(project) {
  const lang = getDetailLanguage();
  const title = lang === "es" ? project.titleEs || project.title : project.title;
  const overview =
    lang === "es"
      ? project.overviewEs || project.overview || project.description
      : project.overview || project.description;
  const documentation = project.documentation?.[lang] || [];
  const demo = Array.isArray(project.demo) ? project.demo : [];

  document.title = `${title} | Hugo Pena Cantonero`;
  document.documentElement.lang = lang;
  projectRepo.style.display = "";
  projectTitle.textContent = title;
  projectOverview.textContent = overview;
  projectRepo.href = project.repository;
  projectRepo.textContent = ui.repository;
  docTitle.textContent = ui.documentation;
  demoTitle.textContent = ui.visualDemo;
  backLink.textContent = ui.back;
  backLink.href = `${basePath}/index.html#personal-projects`;
  contactButton.href = `${basePath}/index.html#contact`;
  contactButton.textContent = ui.contact;

  docList.innerHTML = "";
  demoGrid.innerHTML = "";

  documentation.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    docList.appendChild(li);
  });

  if (!demo.length) {
    demoGrid.appendChild(createLiveDemoItem(project));
    return;
  }

  demo.forEach(shot => {
    demoGrid.appendChild(createDemoItem(shot, project));
  });
}

function handleLanguageToggle() {
  const next = getDetailLanguage() === "en" ? "es" : "en";
  localStorage.setItem(LANGUAGE_KEY, next);
  updateLanguageButton();
  buildUiFromConfig();
  if (resolvedProject === undefined) return;
  if (resolvedProject === null) {
    renderNotFound();
  } else {
    renderProjectDetail(resolvedProject);
  }
}

document.getElementById("language-toggle")?.addEventListener("click", handleLanguageToggle);

bindDiplomaLightboxEvents();
bindProjectDetailDemoLightboxDelegation();
closeDiplomaLightbox();

loadProjects()
  .then(async projects => {
    const project = projects.find(item => item.id === projectId);
    if (!project) {
      resolvedProject = null;
      renderNotFound();
      return;
    }
    resolvedProject = project;
    await validateProjectForDetail(project);
    renderProjectDetail(project);
  })
  .catch(error => {
    console.error("Error loading personal project JSON files:", error);
    resolvedProject = null;
    renderNotFound();
  });
