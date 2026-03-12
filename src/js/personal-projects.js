let personalProjectsLanguage =
  localStorage.getItem("hugo-portfolio-language") || "en";
let personalProjectsData = [];
let personalProjectsConfig = null;

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
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

async function validatePersonalProjects(projectFiles, projects) {
  const ids = new Set();
  const duplicateIds = new Set();

  projects.forEach(project => {
    if (ids.has(project.id)) duplicateIds.add(project.id);
    ids.add(project.id);
  });

  if (duplicateIds.size) {
    console.warn(
      `[personal-projects] Duplicate ids detected: ${Array.from(duplicateIds).join(", ")}`
    );
  }

  if (projectFiles.length !== projects.length) {
    console.warn(
      `[personal-projects] Manifest count (${projectFiles.length}) and loaded project count (${projects.length}) do not match.`
    );
  }

  const checks = projects.map(async project => {
    const requiredFields = ["id", "title", "description", "repository"];
    requiredFields.forEach(field => {
      if (!isNonEmptyString(project[field])) {
        console.warn(
          `[personal-projects] Missing or invalid "${field}" in project: ${project.id || "unknown"}`
        );
      }
    });

    if (!Array.isArray(project.technologies) || !project.technologies.length) {
      console.warn(
        `[personal-projects] technologies must be a non-empty array in project: ${project.id || "unknown"}`
      );
    }

    const demoShots = Array.isArray(project.demo) ? project.demo : [];
    const demoChecks = demoShots.map(async shot => {
      if (!shot.file) return;
      const assetPath = `assets/projects/${project.id}/${shot.file}`;
      const exists = await checkAssetExists(assetPath);
      if (!exists) {
        console.warn(
          `[personal-projects] Demo asset not found: ${assetPath}`
        );
      }
    });

    await Promise.all(demoChecks);
  });

  await Promise.all(checks);
}

async function loadPersonalProjects() {
  const configResponse = await fetch("src/data/personal-projects/config.json");
  personalProjectsConfig = await configResponse.json();

  const projectsBase =
    personalProjectsConfig?.paths?.projectsBase ||
    "src/data/personal-projects/projects";
  const manifestResponse = await fetch(`${projectsBase}/manifest.json`);
  const manifest = await manifestResponse.json();
  const projectFiles = Array.isArray(manifest.projects) ? manifest.projects : [];

  const projects = await Promise.all(
    projectFiles.map(async file => {
      const response = await fetch(`${projectsBase}/${file}`);
      return response.json();
    })
  );

  return { projectFiles, projects, config: personalProjectsConfig };
}

function getPersonalProjectText(project, language) {
  return {
    title: language === "es" ? project.titleEs || project.title : project.title,
    description:
      language === "es"
        ? project.descriptionEs || project.description
        : project.description
  };
}

function navigateToDetails(url) {
  window.location.href = url;
}

function renderPersonalProjects(language = "en") {
  const rail = document.getElementById("personal-projects-grid");
  if (!rail) return;

  const ui =
    personalProjectsConfig?.ui?.[language] ||
    personalProjectsConfig?.ui?.en || {
      cardRepository: "Repository",
      cardDetails: "View details"
    };
  rail.innerHTML = "";
  const visibleCount = Math.max(1, Math.min(3, personalProjectsData.length));
  rail.style.setProperty("--visible-count", String(visibleCount));

  personalProjectsData.forEach(project => {
    const { title, description } = getPersonalProjectText(project, language);

    const card = document.createElement("article");
    card.className = "project-card is-clickable";
    card.tabIndex = 0;
    card.setAttribute("role", "link");
    card.setAttribute("aria-label", title);

    const techHtml = project.technologies
      .map(tech => `<span>${tech}</span>`)
      .join("");

    // Use query params for broad compatibility (no server rewrites required).
    const detailsUrl = `personal-project.html?id=${encodeURIComponent(project.id)}`;

    card.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>
      <div class="project-tech">${techHtml}</div>
      <div class="project-actions">
        <a href="${project.repository}" target="_blank" rel="noopener noreferrer" class="btn secondary">${ui.cardRepository}</a>
        <a href="${detailsUrl}" class="btn primary">${ui.cardDetails}</a>
      </div>
    `;

    card.addEventListener("click", () => navigateToDetails(detailsUrl));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        navigateToDetails(detailsUrl);
      }
    });

    const actionLinks = card.querySelectorAll("a");
    actionLinks.forEach(link => {
      link.addEventListener("click", event => event.stopPropagation());
    });

    rail.appendChild(card);
  });
}

window.addEventListener("portfolio-language-change", event => {
  personalProjectsLanguage = event.detail.language;
  renderPersonalProjects(personalProjectsLanguage);
});

if (personalProjectsData.length) {
  renderPersonalProjects(personalProjectsLanguage);
} else {
  loadPersonalProjects()
    .then(async ({ projectFiles, projects }) => {
      personalProjectsData = projects;
      await validatePersonalProjects(projectFiles, projects);
      renderPersonalProjects(personalProjectsLanguage);
    })
    .catch(error => {
      console.error("Error loading personal project JSON files:", error);
    });
}
