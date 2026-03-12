const toggle = document.getElementById("theme-toggle");
const languageToggle = document.getElementById("language-toggle");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const revealItems = document.querySelectorAll(".reveal");
const sections = Array.from(document.querySelectorAll("main section[id]"));
const THEME_KEY = "hugo-portfolio-theme";
const LANGUAGE_KEY = "hugo-portfolio-language";

const translations = {
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.personalProjects": "Personal Projects",
    "nav.background": "Education & Languages",
    "nav.contact": "Contact",
    "hero.eyebrow": "Software Engineer | Android Developer | QA Automation",
    "hero.title": "Building reliable products for media and streaming platforms.",
    "hero.copy":
      "I am Hugo Pena Cantonero, a Software Engineer with 2 years of experience across Android development, QA automation and cross-platform validation.",
    "hero.cta": "Let's work together",
    "hero.meta.location": "Caceres, Spain",
    "hero.meta.remote": "Remote / Hybrid",
    "hero.meta.language": "English B1",
    "glance.title": "At a glance",
    "glance.metric1": "Years in media tech",
    "glance.metric2": "Professional roles delivered",
    "glance.metric3": "Core focus areas",
    "glance.note":
      "QA-driven mindset with product-quality ownership from implementation to validation.",
    "about.eyebrow": "Profile",
    "about.title": "Recruiter-focused summary",
    "about.body":
      "I have collaborated with international teams on large-scale digital ecosystems, including streaming services and multi-device media platforms. My profile combines development execution (Kotlin, Java, BrightScript) with strong testing discipline (Playwright, Pytest, manual validation on Smart TV and mobile environments), helping teams ship reliable software with fewer production issues.",
    "skills.eyebrow": "Capabilities",
    "skills.title": "Core skills",
    "skills.programming": "Programming",
    "skills.engineering": "Software Engineering",
    "skills.testing": "Testing & QA",
    "skills.ways": "Ways of Working",
    "experience.eyebrow": "Track record",
    "experience.title": "Professional experience",
    "experience.role1.title": "Software Developer (Roku)",
    "experience.role1.b1": "Development of streaming features for Roku using BrightScript.",
    "experience.role1.b2": "Delivery in distributed teams across media-platform contexts.",
    "experience.role1.b3": "Use of AI-assisted tooling for faster implementation and debugging.",
    "experience.role2.title": "Android Developer",
    "experience.role2.b1": "Development of Android features for mobile and STB devices.",
    "experience.role2.b2": "Kotlin implementation aligned with iterative product delivery.",
    "experience.role3.title": "QA Automation Engineer",
    "experience.role3.b1":
      "Automation with Playwright and Pytest for atresplayer.com and related media products.",
    "experience.role3.b2": "Increased test coverage and early defect detection in release cycles.",
    "experience.role4.title": "QA Manual Tester",
    "experience.role4.b1":
      "Functional, UI and performance testing across Smart TV and mobile ecosystems.",
    "experience.role4.b2": "Validation of fixes and release quality for multi-platform applications.",
    "projects.eyebrow": "Selected work",
    "projects.title": "Projects",
    "personalProjects.eyebrow": "Build in public",
    "personalProjects.title": "Personal projects",
    "personalProjects.subtitle":
      "Open-source projects with repository access and dedicated detail pages including documentation and visual demos.",
    "background.eyebrow": "Background",
    "background.title": "Education & Languages",
    "education.eyebrow": "Education",
    "education.title": "Bachelor's Degree in Computer Engineering",
    "education.subtitle": "Software Engineering - Universidad de Extremadura",
    "education.note": "2019 - 2024 (TFG pending)",
    "language.eyebrow": "Languages",
    "language.title": "Communication",
    "language.spanish": "Spanish - Native",
    "language.english": "English - B1",
    "contact.eyebrow": "Open to opportunities",
    "contact.sectionEyebrow": "Get in touch",
    "contact.sectionTitle": "Contact",
    "contact.title": "Let's talk about your next product challenge.",
    "contact.subtitle": "Junior Software Engineer / Android Developer roles in Spain (remote or hybrid).",
    "contact.email": "Email"
  },
  es: {
    "nav.about": "Sobre mí",
    "nav.skills": "Habilidades",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.personalProjects": "Proyectos personales",
    "nav.background": "Educacion e idiomas",
    "nav.contact": "Contacto",
    "hero.eyebrow": "Ingeniero de Software | Desarrollador Android | QA Automation",
    "hero.title": "Ingeniería de software fiable para plataformas de media y streaming.",
    "hero.copy":
      "Soy Hugo Peña Cantonero, ingeniero de software con 2 años de experiencia en desarrollo Android, automatización QA y validación multiplataforma.",
    "hero.cta": "Trabajemos juntos",
    "hero.meta.location": "Cáceres, España",
    "hero.meta.remote": "Remoto / Híbrido",
    "hero.meta.language": "Inglés B1",
    "glance.title": "Resumen rápido",
    "glance.metric1": "Años en media tech",
    "glance.metric2": "Roles profesionales completados",
    "glance.metric3": "Áreas de foco",
    "glance.note":
      "Mentalidad orientada a QA con ownership de calidad desde la implementación hasta la validación.",
    "about.eyebrow": "Perfil",
    "about.title": "Perfil profesional orientado a impacto",
    "about.body":
      "He colaborado con equipos internacionales en ecosistemas digitales de gran escala, incluyendo servicios de streaming y plataformas multidispositivo. Mi perfil combina ejecución de desarrollo (Kotlin, Java, BrightScript) con una disciplina sólida de testing (Playwright, Pytest y validación manual en entornos Smart TV y móvil), ayudando a entregar software fiable con menos incidencias en producción.",
    "skills.eyebrow": "Capacidades",
    "skills.title": "Habilidades principales",
    "skills.programming": "Programación",
    "skills.engineering": "Ingeniería de software",
    "skills.testing": "Testing y QA",
    "skills.ways": "Forma de trabajo",
    "experience.eyebrow": "Trayectoria",
    "experience.title": "Experiencia profesional",
    "experience.role1.title": "Desarrollador de Software (Roku)",
    "experience.role1.b1": "Desarrollo de funcionalidades de streaming para Roku usando BrightScript.",
    "experience.role1.b2": "Entrega en equipos distribuidos dentro de contextos de plataformas de media.",
    "experience.role1.b3": "Uso de herramientas asistidas por IA para acelerar implementación y depuración.",
    "experience.role2.title": "Desarrollador Android",
    "experience.role2.b1": "Desarrollo de funcionalidades Android para dispositivos móviles y STB.",
    "experience.role2.b2": "Implementación en Kotlin alineada con entregas iterativas de producto.",
    "experience.role3.title": "Ingeniero de Automatización QA",
    "experience.role3.b1":
      "Automatización con Playwright y Pytest para atresplayer.com y productos de media relacionados.",
    "experience.role3.b2": "Aumento de cobertura y detección temprana de defectos durante ciclos de release.",
    "experience.role4.title": "QA Manual Tester",
    "experience.role4.b1": "Testing funcional, UI y de rendimiento en ecosistemas Smart TV y móvil.",
    "experience.role4.b2": "Validación de fixes y calidad de release para aplicaciones multiplataforma.",
    "projects.eyebrow": "Trabajo seleccionado",
    "projects.title": "Proyectos",
    "personalProjects.eyebrow": "Build in public",
    "personalProjects.title": "Proyectos personales",
    "personalProjects.subtitle":
      "Proyectos open-source con acceso al repositorio y paginas de detalle con documentacion y demo visual.",
    "background.eyebrow": "Formacion",
    "background.title": "Educacion e idiomas",
    "education.eyebrow": "Educación",
    "education.title": "Grado en Ingeniería Informática",
    "education.subtitle": "Ingeniería del Software - Universidad de Extremadura",
    "education.note": "2019 - 2024 (TFG pendiente)",
    "language.eyebrow": "Idiomas",
    "language.title": "Comunicación",
    "language.spanish": "Español - Nativo",
    "language.english": "Inglés - B1",
    "contact.eyebrow": "Abierto a oportunidades",
    "contact.sectionEyebrow": "Hablemos",
    "contact.sectionTitle": "Contacto",
    "contact.title": "Conversemos sobre cómo puedo aportar valor a tu equipo.",
    "contact.subtitle": "Roles de Junior Software Engineer / Android Developer en España (remoto o híbrido).",
    "contact.email": "Correo"
  }
};

function updateThemeIcon() {
  toggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
}

function updateLanguageButton(language) {
  languageToggle.textContent = language === "es" ? "ES" : "EN";
}

function getStoredLanguage() {
  const storedLanguage = localStorage.getItem(LANGUAGE_KEY);
  return storedLanguage === "es" ? "es" : "en";
}

function applyLanguage(language) {
  const content = translations[language] || translations.en;
  const translatedNodes = document.querySelectorAll("[data-i18n]");

  translatedNodes.forEach(node => {
    const key = node.getAttribute("data-i18n");
    if (key && content[key]) {
      node.textContent = content[key];
    }
  });

  document.documentElement.lang = language;
  localStorage.setItem(LANGUAGE_KEY, language);
  updateLanguageButton(language);

  window.dispatchEvent(
    new CustomEvent("portfolio-language-change", { detail: { language } })
  );
}

function toggleLanguage() {
  const current = getStoredLanguage();
  applyLanguage(current === "en" ? "es" : "en");
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme === "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
  updateThemeIcon();
}

function handleThemeToggle() {
  document.body.classList.toggle("light");
  const nextTheme = document.body.classList.contains("light") ? "light" : "dark";
  localStorage.setItem(THEME_KEY, nextTheme);
  updateThemeIcon();
}

function setActiveLink() {
  const scrollPosition = window.scrollY + 120;
  let currentSection = sections[0]?.id || "";
  const viewportBottom = window.innerHeight + window.scrollY;
  const pageBottom = document.documentElement.scrollHeight;

  if (viewportBottom >= pageBottom - 2 && sections.length) {
    currentSection = sections[sections.length - 1].id;
  } else {
    sections.forEach(section => {
      if (scrollPosition >= section.offsetTop) {
        currentSection = section.id;
      }
    });
  }

  navLinks.forEach(link => {
    const linkTarget = link.getAttribute("href")?.slice(1);
    link.classList.toggle("active", linkTarget === currentSection);
  });
}

function setupRevealAnimations() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach(item => observer.observe(item));
}

applySavedTheme();
applyLanguage(getStoredLanguage());
setupRevealAnimations();
setActiveLink();

toggle.addEventListener("click", handleThemeToggle);
languageToggle.addEventListener("click", toggleLanguage);
window.addEventListener("scroll", setActiveLink);