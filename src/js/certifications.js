let certificationsLanguage =
  localStorage.getItem("hugo-portfolio-language") || "en";
let certificationsData = [];
let lightboxBound = false;
let lastFocusedImageButton = null;

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function getCertificationText(certification, language) {
  return {
    title:
      language === "es"
        ? certification.titleEs || certification.title
        : certification.title,
    issuer:
      language === "es"
        ? certification.issuerEs || certification.issuer
        : certification.issuer,
    diplomaImageAlt:
      language === "es"
        ? certification.diplomaImageAltEs ||
          certification.diplomaImageAlt ||
          certification.titleEs ||
          certification.title
        : certification.diplomaImageAlt ||
          certification.title ||
          "Certification diploma image"
  };
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

  const closeButton = document.getElementById("image-lightbox-close");
  if (closeButton) closeButton.focus();
}

function bindDiplomaLightboxEvents() {
  if (lightboxBound) return;

  const lightbox = document.getElementById("image-lightbox");
  const closeButton = document.getElementById("image-lightbox-close");
  if (!lightbox || !closeButton) return;

  closeButton.addEventListener("click", closeDiplomaLightbox);
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

function bindCertificationImageTriggers() {
  const imageButtons = document.querySelectorAll(".certification-diploma-trigger");
  imageButtons.forEach(button => {
    button.addEventListener("click", () => {
      const imageSrc = button.getAttribute("data-image-src");
      const imageAlt = button.getAttribute("data-image-alt");
      if (!isNonEmptyString(imageSrc)) return;
      openDiplomaLightbox(imageSrc, imageAlt, button);
    });
  });
}

function renderCertifications(language = "en") {
  const grid = document.getElementById("certifications-grid");
  if (!grid) return;


  const emptyStateText =
    language === "es"
      ? "Aun no hay certificaciones publicadas."
      : "No certifications published yet.";

  grid.innerHTML = "";

  if (!certificationsData.length) {
    const emptyCard = document.createElement("article");
    emptyCard.className = "card certification-card";
    emptyCard.innerHTML = `<p class="small-note">${emptyStateText}</p>`;
    grid.appendChild(emptyCard);
    return;
  }

  certificationsData.forEach(certification => {
    const { title, issuer, diplomaImageAlt } = getCertificationText(
      certification,
      language
    );
    const card = document.createElement("article");
    card.className = "card certification-card";
    const hasDiplomaImage = isNonEmptyString(certification.diplomaImage);

  
    const diplomaImage = hasDiplomaImage
      ? `
        <figure class="certification-diploma-wrap">
          <button
            type="button"
            class="certification-diploma-trigger"
            data-image-src="${certification.diplomaImage}"
            data-image-alt="${diplomaImageAlt}"
            aria-label="${diplomaImageAlt}"
          >
            <img
              src="${certification.diplomaImage}"
              alt="${diplomaImageAlt}"
              class="certification-diploma"
              loading="lazy"
              decoding="async"
            />
          </button>
        </figure>
      `
      : "";

    card.innerHTML = `
      ${diplomaImage}
      <p class="eyebrow">${issuer}</p>
      <h3>${title}</h3>
      <p class="small-note certification-date">${certification.date}</p>
    `;

    grid.appendChild(card);
  });

  bindCertificationImageTriggers();
}

window.addEventListener("portfolio-language-change", event => {
  certificationsLanguage = event.detail.language;
  renderCertifications(certificationsLanguage);
});

fetch("src/data/certifications.json")
  .then(response => response.json())
  .then(certifications => {
    certificationsData = Array.isArray(certifications) ? certifications : [];
    bindDiplomaLightboxEvents();
    // Force closed state on initial load.
    closeDiplomaLightbox();
    renderCertifications(certificationsLanguage);
  })
  .catch(error => {
    console.error("Error loading certifications:", error);
  });
