const statusLabels = {
  en: {
    in_progress: "In progress",
    completed: "Completed"
  },
  es: {
    in_progress: "En curso",
    completed: "Finalizada"
  }
};

let trainingsLanguage = localStorage.getItem("hugo-portfolio-language") || "en";
let trainingsData = [];

function getTrainingText(item, language) {
  const es = language === "es";
  return {
    title: es ? item.titleEs || item.title : item.title,
    provider: es ? item.providerEs || item.provider : item.provider,
    period: es ? item.periodEs || item.period : item.period,
    description: es ? item.descriptionEs || item.description : item.description
  };
}

function renderTrainings(language = "en") {
  const grid = document.getElementById("trainings-grid");
  if (!grid) return;

  const emptyText =
    language === "es"
      ? "Aún no hay formaciones publicadas."
      : "No training programs listed yet.";

  grid.innerHTML = "";

  if (!trainingsData.length) {
    const empty = document.createElement("p");
    empty.className = "small-note";
    empty.textContent = emptyText;
    grid.appendChild(empty);
    return;
  }

  const labels = statusLabels[language] || statusLabels.en;

  trainingsData.forEach(item => {
    const { title, provider, period, description } = getTrainingText(item, language);
    const statusKey = item.status === "completed" ? "completed" : "in_progress";
    const statusText = labels[statusKey] || labels.in_progress;

    const card = document.createElement("article");
    card.className = "project-card training-card";

    const topics =
      Array.isArray(item.topics) && item.topics.length
        ? `<div class="project-tech">${item.topics.map(t => `<span>${t}</span>`).join("")}</div>`
        : "";

    const link =
      typeof item.url === "string" && item.url.trim()
        ? `<div class="project-actions"><a href="${item.url.trim()}" target="_blank" rel="noopener noreferrer" class="btn secondary">${language === "es" ? "Ver programa" : "View program"}</a></div>`
        : "";

    card.innerHTML = `
      <div class="training-card-head">
        <span class="training-status training-status--${statusKey}">${statusText}</span>
        <p class="small-note training-period">${period}</p>
      </div>
      <p class="eyebrow">${provider}</p>
      <h3>${title}</h3>
      <p>${description}</p>
      ${topics}
      ${link}
    `;

    grid.appendChild(card);
  });
}

window.addEventListener("portfolio-language-change", event => {
  trainingsLanguage = event.detail.language;
  renderTrainings(trainingsLanguage);
});

fetch("src/data/trainings.json")
  .then(response => response.json())
  .then(data => {
    trainingsData = Array.isArray(data) ? data : [];
    renderTrainings(trainingsLanguage);
  })
  .catch(error => {
    console.error("Error loading trainings:", error);
  });
