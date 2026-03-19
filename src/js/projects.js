const projectTranslations = {
  es: {
    "ClaroVideo Roku Streaming App":
      "Aplicación de streaming ClaroVideo para Roku",
    "Feature development for a large-scale streaming app on Roku devices within distributed engineering teams.":
      "Desarrollo de funcionalidades para una app de streaming a gran escala en dispositivos Roku dentro de equipos de ingeniería distribuidos.",
    "Android Internal App (Mobile + STB)":
      "Aplicación interna Android (Mobile + STB)",
    "Android application development for mobile and set-top box devices with iterative feature delivery.":
      "Desarrollo de aplicación Android para dispositivos móviles y set-top box con entrega iterativa de funcionalidades.",
    "QA Automation for Media Platforms":
      "Automatización QA para plataformas de media",
    "Automated testing with Playwright and Pytest across streaming and digital media platforms.":
      "Testing automatizado con Playwright y Pytest en plataformas de streaming y media digital."
  }
};

let projectsData = [];
let currentLanguage = localStorage.getItem("hugo-portfolio-language") || "en";

function translateProjectText(text, language) {
  if (language !== "es") return text;
  return projectTranslations.es[text] || text;
}

function renderProjects(language = "en") {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = "";

  projectsData.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    const repositoryText =
      language === "es" ? "Ver repositorio" : "View repository";
    const repositoryFallback =
      language === "es"
        ? "Repositorio disponible bajo petición"
        : "Repository available on request";

    const githubLink = project.github
      ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn secondary">${repositoryText}</a>`
      : `<span class="small-note">${repositoryFallback}</span>`;

    card.innerHTML = `
      <h3>${translateProjectText(project.title, language)}</h3>
      <p>${translateProjectText(project.description, language)}</p>
      <div class="project-tech">
        ${project.technologies.map(tech => `<span>${tech}</span>`).join("")}
      </div>
    `;

    grid.appendChild(card);
  });
}

window.addEventListener("portfolio-language-change", event => {
  currentLanguage = event.detail.language;
  renderProjects(currentLanguage);
});

fetch("src/data/projects.json")
  .then(response => response.json())
  .then(projects => {
    projectsData = projects;
    renderProjects(currentLanguage);
  })
  .catch(error => console.error("Error loading projects:", error));