const toggle = document.getElementById("theme-toggle");
const languageToggle = document.getElementById("language-toggle");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const revealItems = document.querySelectorAll(".reveal");
const sections = Array.from(document.querySelectorAll("main section[id]"));
const THEME_KEY = "portfolio-template-theme";
const LANGUAGE_KEY = "portfolio-template-language";

const translations = {
  en: {
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.certifications": "Certifications",
    "nav.personalProjects": "Personal Projects",
    "nav.background": "Education & Languages",
    "nav.contact": "Contact",
    "hero.eyebrow": "Software Engineer | Android Developer | QA Automation",
    "hero.title": "Building reliable products for media and streaming platforms.",
    "hero.copy":
      "I am [YOUR NAME], a [YOUR ROLE] with [X] years of experience in [SPECIALTY 1], [SPECIALTY 2], and [SPECIALTY 3].",
    "hero.cta": "Let's work together",
    "hero.meta.location": "[YOUR CITY], [YOUR COUNTRY]",
    "hero.meta.remote": "[REMOTE / HYBRID / ONSITE]",
    "hero.meta.language": "[LANGUAGE LEVEL]",
    "glance.title": "At a glance",
    "glance.metric1": "Years in media tech",
    "glance.metric2": "Professional roles delivered",
    "glance.metric3": "Core focus areas",
    "glance.note":
      "QA-driven mindset with product-quality ownership from implementation to validation.",
    "about.eyebrow": "Profile",
    "about.title": "Recruiter-focused summary",
    "about.body":
      "I have collaborated with [TEAM/COMPANY TYPE] on [DOMAIN/PRODUCT TYPE]. My profile combines [CORE SKILLS] with [SECONDARY SKILLS], helping teams deliver reliable software with measurable impact.",
    "skills.eyebrow": "Capabilities",
    "skills.title": "Core skills",
    "skills.programming": "Programming",
    "skills.engineering": "Software Engineering",
    "skills.testing": "Testing & QA",
    "skills.ways": "Ways of Working",
    "experience.eyebrow": "Track record",
    "experience.title": "Professional experience",
    "experience.role1.title": "[ROLE TITLE 1]",
    "experience.role1.b1": "[RESPONSIBILITY 1]",
    "experience.role1.b2": "[RESPONSIBILITY 2]",
    "experience.role1.b3": "[RESPONSIBILITY 3]",
    "experience.role2.title": "[ROLE TITLE 2]",
    "experience.role2.b1": "[RESPONSIBILITY 1]",
    "experience.role2.b2": "[RESPONSIBILITY 2]",
    "experience.role3.title": "[ROLE TITLE 3]",
    "experience.role3.b1": "[RESPONSIBILITY 1]",
    "experience.role3.b2": "[RESPONSIBILITY 2]",
    "experience.role4.title": "[ROLE TITLE 4]",
    "experience.role4.b1": "[RESPONSIBILITY 1]",
    "experience.role4.b2": "[RESPONSIBILITY 2]",
    "projects.eyebrow": "Selected work",
    "projects.title": "Projects",
    "personalProjects.eyebrow": "Build in public",
    "personalProjects.title": "Personal projects",
    "personalProjects.subtitle":
      "Open-source projects with repository access and dedicated detail pages including documentation and visual demos.",
    "certifications.eyebrow": "Validated learning",
    "certifications.title": "Certifications",
    "certifications.subtitle":
      "Formal training and credentials that support practical software engineering and QA delivery.",
    "background.eyebrow": "Background",
    "background.title": "Education & Languages",
    "education.eyebrow": "Education",
    "education.title": "Bachelor's Degree in Computer Engineering",
    "education.subtitle": "[DEGREE OR SPECIALIZATION] - [UNIVERSITY / INSTITUTION]",
    "education.note": "[START YEAR] - [END YEAR / IN PROGRESS]",
    "language.eyebrow": "Languages",
    "language.title": "Communication",
    "language.spanish": "[LANGUAGE 1] - [LEVEL]",
    "language.english": "[LANGUAGE 2] - [LEVEL]",
    "contact.eyebrow": "Open to opportunities",
    "contact.sectionEyebrow": "Get in touch",
    "contact.sectionTitle": "Contact",
    "contact.title": "Let's talk about your next product challenge.",
    "contact.subtitle": "[TARGET ROLE] opportunities in [LOCATION] ([WORK MODE]).",
    "contact.email": "Email"
  },
  es: {
    "nav.about": "Sobre mí",
    "nav.skills": "Habilidades",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.certifications": "Certificaciones",
    "nav.personalProjects": "Proyectos personales",
    "nav.background": "Educacion e idiomas",
    "nav.contact": "Contacto",
    "hero.eyebrow": "Ingeniero de Software | Desarrollador Android | QA Automation",
    "hero.title": "Ingeniería de software fiable para plataformas de media y streaming.",
    "hero.copy":
      "Soy [TU NOMBRE], [TU ROL] con [X] años de experiencia en [ESPECIALIDAD 1], [ESPECIALIDAD 2] y [ESPECIALIDAD 3].",
    "hero.cta": "Trabajemos juntos",
    "hero.meta.location": "[TU CIUDAD], [TU PAÍS]",
    "hero.meta.remote": "[REMOTO / HÍBRIDO / PRESENCIAL]",
    "hero.meta.language": "[NIVEL DE IDIOMA]",
    "glance.title": "Resumen rápido",
    "glance.metric1": "Años en media tech",
    "glance.metric2": "Roles profesionales completados",
    "glance.metric3": "Áreas de foco",
    "glance.note":
      "Mentalidad orientada a QA con ownership de calidad desde la implementación hasta la validación.",
    "about.eyebrow": "Perfil",
    "about.title": "Perfil profesional orientado a impacto",
    "about.body":
      "He colaborado con [TIPO DE EQUIPO/EMPRESA] en [DOMINIO/TIPO DE PRODUCTO]. Mi perfil combina [HABILIDADES PRINCIPALES] con [HABILIDADES SECUNDARIAS], ayudando a entregar software fiable con impacto medible.",
    "skills.eyebrow": "Capacidades",
    "skills.title": "Habilidades principales",
    "skills.programming": "Programación",
    "skills.engineering": "Ingeniería de software",
    "skills.testing": "Testing y QA",
    "skills.ways": "Forma de trabajo",
    "experience.eyebrow": "Trayectoria",
    "experience.title": "Experiencia profesional",
    "experience.role1.title": "[TITULO DEL ROL 1]",
    "experience.role1.b1": "[RESPONSABILIDAD 1]",
    "experience.role1.b2": "[RESPONSABILIDAD 2]",
    "experience.role1.b3": "[RESPONSABILIDAD 3]",
    "experience.role2.title": "[TITULO DEL ROL 2]",
    "experience.role2.b1": "[RESPONSABILIDAD 1]",
    "experience.role2.b2": "[RESPONSABILIDAD 2]",
    "experience.role3.title": "[TITULO DEL ROL 3]",
    "experience.role3.b1": "[RESPONSABILIDAD 1]",
    "experience.role3.b2": "[RESPONSABILIDAD 2]",
    "experience.role4.title": "[TITULO DEL ROL 4]",
    "experience.role4.b1": "[RESPONSABILIDAD 1]",
    "experience.role4.b2": "[RESPONSABILIDAD 2]",
    "projects.eyebrow": "Trabajo seleccionado",
    "projects.title": "Proyectos",
    "personalProjects.eyebrow": "Build in public",
    "personalProjects.title": "Proyectos personales",
    "personalProjects.subtitle":
      "Proyectos open-source con acceso al repositorio y paginas de detalle con documentacion y demo visual.",
    "certifications.eyebrow": "Aprendizaje validado",
    "certifications.title": "Certificaciones",
    "certifications.subtitle":
      "Formacion y credenciales que respaldan la practica en ingenieria de software y QA.",
    "background.eyebrow": "Formacion",
    "background.title": "Educacion e idiomas",
    "education.eyebrow": "Educación",
    "education.title": "Grado en Ingeniería Informática",
    "education.subtitle": "[GRADO O ESPECIALIDAD] - [UNIVERSIDAD / INSTITUCIÓN]",
    "education.note": "[AÑO INICIO] - [AÑO FIN / EN CURSO]",
    "language.eyebrow": "Idiomas",
    "language.title": "Comunicación",
    "language.spanish": "[IDIOMA 1] - [NIVEL]",
    "language.english": "[IDIOMA 2] - [NIVEL]",
    "contact.eyebrow": "Abierto a oportunidades",
    "contact.sectionEyebrow": "Hablemos",
    "contact.sectionTitle": "Contacto",
    "contact.title": "Conversemos sobre cómo puedo aportar valor a tu equipo.",
    "contact.subtitle": "Oportunidades como [ROL OBJETIVO] en [UBICACIÓN] ([MODALIDAD]).",
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