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
      return '<div class="project-no-preview">Technical media unavailable</div>';
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
      const sizeClass = item.size === 'compact' ? ' project-media--compact' : '';
      const fitClass = item.fit === 'contain' ? ' is-contain' : '';
      const naturalClass = item.aspect === 'natural' ? ' is-natural' : '';
      const caption = renderMediaCaption(item);

      if (item.type === 'video') {
        const poster = item.poster ? ` poster="${escapeHTML(item.poster)}"` : '';
        return `
          <figure class="project-media${wideClass}${sizeClass}">
            ${caption}
            <div class="project-media-frame${naturalClass}">
              <video class="${fitClass.trim()}" controls playsinline preload="metadata"${poster} aria-label="${escapeHTML(item.title || item.caption || `${project.title} video`)}">
                <source src="${escapeHTML(item.src)}" type="${escapeHTML(item.mimeType || 'video/mp4')}">
                Your browser does not support embedded video.
              </video>
            </div>
          </figure>`;
      }

      return `
        <figure class="project-media${wideClass}${sizeClass}">
          ${caption}
          <a class="project-media-frame${naturalClass}" href="${escapeHTML(item.src)}" target="_blank" rel="noreferrer" aria-label="Open full-size image: ${escapeHTML(item.title || item.alt || project.title)}">
            <img class="${fitClass.trim()}" src="${escapeHTML(item.src)}" alt="${escapeHTML(item.alt || '')}" loading="lazy" decoding="async">
          </a>
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

  const projectDetailBlock = (label, content) => `
    <div class="project-detail-block">
      <h4>${escapeHTML(label)}</h4>
      <p>${escapeHTML(content)}</p>
    </div>`;

  function renderProjectDetails(project) {
    let blocks;

    switch (project.id) {
      case 'lunar-solar':
        blocks = [
          ['Model', project.model],
          ['Validation', project.validation],
          ['Evidence', project.result],
          ['Limits', project.limitations]
        ];
        break;
      case 'lunar-terrain':
        blocks = [];
        break;
      case 'orbitminer':
        blocks = [
          ['Routing problem', project.problem],
          ['Optimisation approach', project.model],
          ['Benchmarking and reformulation', `${project.validation} ${project.assumptions}`],
          ['Evidence', project.result]
        ];
        break;
      case 'rpm':
        blocks = [];
        break;
      default:
        blocks = [['Overview', project.problem]];
    }

    return blocks.length
      ? `<div class="project-detail-grid">${blocks.map(([label, content]) => projectDetailBlock(label, content)).join('')}</div>`
      : '';
  }

  function projectTemplate(project) {
    return `
      <details class="project-card" data-reveal>
        <summary class="project-summary">
          ${renderProjectPreview(project)}
          <div class="project-summary-copy">
            <p class="project-kicker">${escapeHTML(project.year)} · ${escapeHTML(project.context)}</p>
            <h3 class="project-heading">${escapeHTML(project.title)}</h3>
            <p class="project-context">${escapeHTML(project.summary || project.problem)}</p>
            <p class="project-contribution"><strong>My contribution:</strong> ${escapeHTML(project.contribution || project.implementation)}</p>
            <ul class="project-tags" aria-label="Project topics">${renderList(project.tags)}</ul>
          </div>
          <span class="project-toggle" aria-hidden="true">+</span>
        </summary>
        <div class="project-detail">
          ${renderProjectMedia(project)}
          ${renderProjectSupplement(project)}
          ${renderProjectDetails(project)}
          ${renderProjectLinks(project)}
        </div>
      </details>`;
  }

  function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (container) {
      const projects = data.projects.slice().sort((first, second) => (first.order || 99) - (second.order || 99));
      container.innerHTML = projects.map(projectTemplate).join('');
    }
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
          <p class="publication-meta">
            <span>${escapeHTML(item.venue)}</span>
            <span>${escapeHTML(item.date || item.year || '')}</span>
            <span>${escapeHTML(item.role)}</span>
            ${link ? `<span>${link}</span>` : ''}
          </p>
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
        <a class="button button-light" href="mailto:${escapeHTML(person.email)}">Email me</a>
        <a class="button button-light" href="${escapeHTML(person.cvPath)}" download>Download CV</a>
      </div>
      `;
  }

  function setupNavigation() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.getElementById('site-nav');
    const brand = document.querySelector('.brand');
    if (!toggle || !nav) return;

    if (brand) {
      brand.addEventListener('click', (event) => {
        event.preventDefault();
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        history.replaceState(null, '', '#page-top');
      });
    }

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
  renderContact();
  setupNavigation();
  setStructuredData();

  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = String(new Date().getFullYear());

  setupReveals();
})();
