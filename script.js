(() => {
  'use strict';

  const data = window.portfolioData;
  if (!data) {
    console.warn('Portfolio data was not loaded. Static fallback content remains available.');
    return;
  }

  const escapeHTML = (value = '') => String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);

  const renderList = (items = []) => items.map((item) => `<li>${escapeHTML(item)}</li>`).join('');

  const externalLinkAttributes = (url) => /^https?:\/\//i.test(url)
    ? ' target="_blank" rel="noreferrer"'
    : '';

  const mediaIsEnabled = (item) => Boolean(item && item.enabled !== false && item.src);

  function renderProjectPreview(project) {
    const preview = project.preview;
    if (!mediaIsEnabled(preview)) {
      return `<div class="project-visual visual-${escapeHTML(project.visual || 'systems')}" aria-hidden="true"></div>`;
    }

    const label = preview.label
      ? `<span class="project-preview-label">${escapeHTML(preview.label)}</span>`
      : '';
    const fitClass = preview.fit === 'contain' ? ' is-contain' : '';

    if (preview.type === 'video') {
      const poster = preview.poster ? ` poster="${escapeHTML(preview.poster)}"` : '';
      return `
        <figure class="project-preview">
          <video class="${fitClass.trim()}" muted playsinline preload="metadata"${poster} aria-label="${escapeHTML(preview.caption || `${project.title} preview`)}">
            <source src="${escapeHTML(preview.src)}" type="${escapeHTML(preview.mimeType || 'video/mp4')}">
          </video>
          ${label}
        </figure>`;
    }

    return `
      <figure class="project-preview">
        <img class="${fitClass.trim()}" src="${escapeHTML(preview.src)}" alt="${escapeHTML(preview.alt || project.title)}" loading="lazy" decoding="async">
        ${label}
      </figure>`;
  }

  function renderMediaCaption(item) {
    const role = item.role
      ? `<span class="project-media-role">${escapeHTML(item.role)}</span>`
      : '';
    const title = item.title
      ? `<strong>${escapeHTML(item.title)}</strong>`
      : '';
    const caption = item.caption
      ? `<p>${escapeHTML(item.caption)}</p>`
      : '';

    return role || title || caption
      ? `<figcaption>${role}${title}${caption}</figcaption>`
      : '';
  }

  function renderProjectMedia(project) {
    const enabledMedia = Array.isArray(project.media)
      ? project.media.filter(mediaIsEnabled)
      : [];

    if (enabledMedia.length === 0) return '';

    const items = enabledMedia.map((item) => {
      const wideClass = item.layout === 'wide' ? ' project-media--wide' : '';
      const fitClass = item.fit === 'contain' ? ' is-contain' : '';
      const naturalClass = item.aspect === 'natural' ? ' is-natural' : '';
      const caption = renderMediaCaption(item);

      if (item.type === 'video') {
        const poster = item.poster ? ` poster="${escapeHTML(item.poster)}"` : '';
        return `
          <figure class="project-media${wideClass}">
            <div class="project-media-frame${naturalClass}">
              <video class="${fitClass.trim()}" controls playsinline preload="metadata"${poster} aria-label="${escapeHTML(item.title || item.caption || `${project.title} video`)}">
                <source src="${escapeHTML(item.src)}" type="${escapeHTML(item.mimeType || 'video/mp4')}">
                Your browser does not support embedded video.
              </video>
            </div>
            ${caption}
          </figure>`;
      }

      return `
        <figure class="project-media${wideClass}">
          <a class="project-media-frame${naturalClass}" href="${escapeHTML(item.src)}" target="_blank" rel="noreferrer" aria-label="Open full-size image: ${escapeHTML(item.title || item.alt || project.title)}">
            <img class="${fitClass.trim()}" src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt || '')}" loading="lazy" decoding="async">
          </a>
          ${caption}
        </figure>`;
    }).join('');

    return `<div class="project-media-gallery" aria-label="${escapeHTML(project.title)} media">${items}</div>`;
  }

  function renderProjectSupplement(project) {
    const facts = Array.isArray(project.facts) && project.facts.length
      ? `<dl class="project-facts">${project.facts.map((fact) => `
          <div>
            <dt>${escapeHTML(fact.label)}</dt>
            <dd>${escapeHTML(fact.value)}</dd>
          </div>`).join('')}</dl>`
      : '';

    const equation = project.equation && project.equation.expression
      ? `<div class="project-equation">
          <p class="project-equation-label">${escapeHTML(project.equation.label || 'Model equation')}</p>
          <p class="project-equation-expression">${escapeHTML(project.equation.expression)}</p>
          ${project.equation.description ? `<p class="project-equation-description">${escapeHTML(project.equation.description)}</p>` : ''}
        </div>`
      : '';

    return equation || facts
      ? `<div class="project-model-summary">${equation}${facts}</div>`
      : '';
  }

  function renderProjectLinks(project) {
    const links = (project.links || []).map((link) => `
      <a class="text-link" href="${escapeHTML(link.url)}"${externalLinkAttributes(link.url)}>
        ${escapeHTML(link.label)} <span aria-hidden="true">↗</span><span class="sr-only">${/^https?:\/\//i.test(link.url) ? ' (opens in a new tab)' : ''}</span>
      </a>`).join('');

    const missing = (project.missingLinks || []).map((label) => `<span class="unavailable-link">${escapeHTML(label)}</span>`).join('');
    return links || missing ? `<div class="project-link-row">${links}${missing}</div>` : '';
  }

  function projectTemplate(project) {
    return `
      <details class="project-card" data-reveal>
        <summary class="project-summary">
          ${renderProjectPreview(project)}
          <div class="project-summary-copy">
            <p class="project-kicker">${escapeHTML(project.year)} · ${escapeHTML(project.context)}</p>
            <h3 class="project-heading">${escapeHTML(project.title)}</h3>
            <p class="project-context">${escapeHTML(project.problem)}</p>
            <ul class="project-tags" aria-label="Project topics">${renderList(project.tags)}</ul>
          </div>
          <span class="project-toggle" aria-hidden="true">+</span>
        </summary>
        <div class="project-detail">
          ${renderProjectMedia(project)}
          ${renderProjectSupplement(project)}
          <div class="case-grid">
            <div class="case-item"><h4>Engineering problem</h4><p>${escapeHTML(project.problem)}</p></div>
            <div class="case-item"><h4>Model or method</h4><p>${escapeHTML(project.model)}</p></div>
            <div class="case-item"><h4>Assumptions & constraints</h4><p>${escapeHTML(project.assumptions)}</p></div>
            <div class="case-item"><h4>Implementation</h4><p>${escapeHTML(project.implementation)}</p></div>
            <div class="case-item"><h4>Verification / validation</h4><p>${escapeHTML(project.validation)}</p></div>
            <div class="case-item"><h4>Result or insight</h4><p>${escapeHTML(project.result)}</p></div>
            <div class="case-item limitations"><h4>Limitations</h4><p>${escapeHTML(project.limitations)}</p></div>
          </div>
          <ul class="tag-list" aria-label="Tools and methods">${renderList(project.tools)}</ul>
          ${renderProjectLinks(project)}
        </div>
      </details>`;
  }

  function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (container) container.innerHTML = data.projects.map(projectTemplate).join('');
  }

  function renderTimeline(containerId, entries, titleKey = 'role') {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = entries.map((item) => `
      <article class="timeline-item" data-reveal>
        <p class="timeline-date">${escapeHTML(item.dates)}</p>
        <div class="timeline-content">
          <h3>${escapeHTML(item[titleKey])}</h3>
          <p class="organisation">${escapeHTML(item.organisation)} · ${escapeHTML(item.location)}</p>
          <ul>${renderList(item.points)}</ul>
        </div>
      </article>`).join('');
  }

  function renderEducation() {
    const container = document.getElementById('education-list');
    if (!container) return;
    container.innerHTML = data.education.map((item) => `
      <article class="education-card" data-reveal>
        <p class="date">${escapeHTML(item.dates)}</p>
        <h3>${escapeHTML(item.degree)}</h3>
        <p class="institution">${escapeHTML(item.institution)}</p>
        <ul>${renderList(item.details)}</ul>
      </article>`).join('');
  }

  function renderPublications() {
    const container = document.getElementById('publication-list');
    if (!container) return;
    container.innerHTML = data.publications.map((item) => {
      const link = item.link
        ? `<a href="${escapeHTML(item.link)}"${externalLinkAttributes(item.link)}>${escapeHTML(item.linkLabel || 'View publication')} <span aria-hidden="true">↗</span><span class="sr-only"> (opens in a new tab)</span></a>`
        : '';
      return `
        <article class="publication-item" data-reveal>
          <div>
            <p class="publication-status">${escapeHTML(item.status)}</p>
            <h3>${escapeHTML(item.title)}</h3>
            <p>${escapeHTML(item.summary)}</p>
          </div>
          <p class="publication-meta">${escapeHTML(item.venue)}<br>${escapeHTML(item.year)} · ${escapeHTML(item.role)}${link ? `<br>${link}` : ''}</p>
        </article>`;
    }).join('');
  }

  function renderSkills() {
    const container = document.getElementById('skills-grid');
    if (!container) return;
    container.innerHTML = data.skills.map((group) => `
      <article class="skill-group" data-reveal>
        <h3>${escapeHTML(group.title)}</h3>
        <ul>${renderList(group.items)}</ul>
      </article>`).join('');
  }

  function renderLanguages() {
    const container = document.getElementById('languages-list');
    if (!container) return;
    container.innerHTML = data.languages.map((item) => `
      <article class="language-item" data-reveal>
        <h3>${escapeHTML(item.language)}</h3>
        <p>${escapeHTML(item.level)}</p>
      </article>`).join('');
  }

  function renderContact() {
    const container = document.getElementById('contact-card');
    if (!container) return;
    const person = data.person;
    container.innerHTML = `
      <div class="contact-details">
        <p class="contact-invitation">${escapeHTML(person.invitation)}</p>
        <dl>
          <div><dt>Email</dt><dd><a href="mailto:${escapeHTML(person.email)}">${escapeHTML(person.email)}</a></dd></div>
          <div><dt>GitHub</dt><dd><a href="${escapeHTML(person.github)}" target="_blank" rel="noreferrer">github.com/magonrod <span class="sr-only">(opens in a new tab)</span></a></dd></div>
          <div><dt>LinkedIn</dt><dd><a href="${escapeHTML(person.linkedin)}" target="_blank" rel="noreferrer">linkedin.com/in/maria-gonzalez-rod <span class="sr-only">(opens in a new tab)</span></a></dd></div>
        </dl>
        <a class="button button-light" href="${escapeHTML(person.cvPath)}" download>Download CV</a>
      </div>
      <form class="contact-form" id="contact-form" action="mailto:${escapeHTML(person.email)}" method="post" enctype="text/plain">
        <div class="form-row">
          <label for="contact-name">Name</label>
          <input id="contact-name" name="name" type="text" autocomplete="name" required>
        </div>
        <div class="form-row">
          <label for="contact-email">Email</label>
          <input id="contact-email" name="email" type="email" autocomplete="email" required>
        </div>
        <div class="form-row">
          <label for="contact-subject">Subject</label>
          <input id="contact-subject" name="subject" type="text" value="Master’s thesis opportunity" required>
        </div>
        <div class="form-row">
          <label for="contact-message">Message</label>
          <textarea id="contact-message" name="message" rows="6" required></textarea>
        </div>
        <button class="button button-light" type="submit">Send message</button>
        <p class="form-note" id="contact-form-status">This opens your email application. The website does not store your message.</p>
      </form>`;
  }

  function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const senderEmail = String(formData.get('email') || '').trim();
      const subject = String(formData.get('subject') || 'Portfolio enquiry').trim();
      const message = String(formData.get('message') || '').trim();
      const body = `Name: ${name}\nEmail: ${senderEmail}\n\n${message}`;
      const mailto = `mailto:${data.person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status = document.getElementById('contact-form-status');
      if (status) status.textContent = 'Opening your email application…';
      window.location.href = mailto;
    });
  }

  function setupNavigation() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;

    const closeNav = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('is-open', !isOpen);
    });

    nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) closeNav();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
        toggle.focus();
      }
    });
  }

  function setupReveals() {
    const elements = [...document.querySelectorAll('[data-reveal]')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    elements.forEach((element) => observer.observe(element));
  }

  function setStructuredData() {
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: data.person.name,
      email: `mailto:${data.person.email}`,
      url: data.site.canonicalUrl,
      jobTitle: data.person.headline,
      sameAs: [data.person.github, data.person.linkedin],
      alumniOf: data.education.map((item) => ({ '@type': 'CollegeOrUniversity', name: item.institution })),
      knowsAbout: ['Aerospace engineering', 'Engineering simulation', 'Numerical modelling', 'Verification and validation', 'Optimisation', 'Planetary robotics']
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.append(script);
  }

  renderProjects();
  renderTimeline('experience-list', data.experience, 'role');
  renderEducation();
  renderTimeline('workshops-list', data.workshops, 'title');
  renderPublications();
  renderSkills();
  renderLanguages();
  renderContact();
  setupContactForm();
  setupNavigation();
  setStructuredData();

  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = String(new Date().getFullYear());

  setupReveals();
})();
