// exportHtml.js - Generates a standalone, downloadable HTML portfolio

import { getSkillData } from './skillIcons';

/**
 * Generates the full HTML string for the portfolio
 */
export function generatePortfolioHTML(data, template = 'purple-dark') {
    const { personalInfo, education, skills, projects } = data;

    const themes = {
        'purple-dark': {
            bg: '#0B0B1A',
            surface: 'rgba(255,255,255,0.05)',
            primary: '#8B5CF6',
            text: '#F1F5F9',
            muted: '#94A3B8',
            border: 'rgba(139,92,246,0.25)',
            accent: '#EC4899',
            navBg: 'rgba(11,11,26,0.9)',
        },
        'minimal-light': {
            bg: '#F8F9FA',
            surface: '#FFFFFF',
            primary: '#6D28D9',
            text: '#1E1B4B',
            muted: '#64748B',
            border: '#E2E8F0',
            accent: '#7C3AED',
            navBg: 'rgba(255,255,255,0.9)',
        },
        'gradient-blue': {
            bg: '#0A0F2E',
            surface: 'rgba(255,255,255,0.06)',
            primary: '#3B82F6',
            text: '#F0F6FF',
            muted: '#93C5FD',
            border: 'rgba(59,130,246,0.3)',
            accent: '#06B6D4',
            navBg: 'rgba(10,15,46,0.9)',
        },
    };

    const t = themes[template] || themes['purple-dark'];
    const initials = personalInfo.fullName
        ? personalInfo.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'PB';

    const socialLinks = [
        personalInfo.linkedin && `<a href="${personalInfo.linkedin}" target="_blank" style="color:${t.muted};text-decoration:none;transition:color 0.2s" onmouseover="this.style.color='${t.primary}'" onmouseout="this.style.color='${t.muted}'">LinkedIn</a>`,
        personalInfo.github && `<a href="${personalInfo.github}" target="_blank" style="color:${t.muted};text-decoration:none;transition:color 0.2s" onmouseover="this.style.color='${t.primary}'" onmouseout="this.style.color='${t.muted}'">GitHub</a>`,
        personalInfo.youtube && `<a href="${personalInfo.youtube}" target="_blank" style="color:${t.muted};text-decoration:none;transition:color 0.2s" onmouseover="this.style.color='${t.primary}'" onmouseout="this.style.color='${t.muted}'">YouTube</a>`,
    ].filter(Boolean).join(' &nbsp;|&nbsp; ');

    const skillsHTML = skills.length > 0
        ? skills.map(skill => {
            const sd = getSkillData(skill);
            return `<span style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:999px;background:${sd.bg};color:${sd.color};border:1px solid ${sd.color}33;font-size:0.875rem;font-weight:500;margin:4px">
          ${sd.icon} ${sd.name}
        </span>`;
        }).join('')
        : '<p>No skills added.</p>';

    const projectsHTML = projects.length > 0
        ? projects.map(p => `
      <div style="background:${t.surface};border:1px solid ${t.border};border-radius:16px;overflow:hidden;transition:transform 0.2s" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='none'">
        ${p.image ? `<img src="${p.image}" alt="${p.title}" style="width:100%;height:180px;object-fit:cover" />` : `<div style="width:100%;height:180px;background:linear-gradient(135deg,${t.primary}33,${t.accent}33);display:flex;align-items:center;justify-content:center;font-size:2.5rem">📁</div>`}
        <div style="padding:20px">
          <div style="font-size:0.75rem;color:${t.primary};font-weight:600;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px">${p.category || 'Project'}</div>
          <h3 style="color:${t.text};font-size:1.1rem;font-weight:700;margin:0 0 10px 0">${p.title}</h3>
          <p style="color:${t.muted};font-size:0.875rem;line-height:1.6;margin:0 0 16px 0">${p.description}</p>
          ${p.link ? `<a href="${p.link}" target="_blank" style="color:${t.primary};text-decoration:none;font-size:0.875rem;font-weight:600">View Project →</a>` : ''}
        </div>
      </div>
    `).join('')
        : '<p>No projects added.</p>';

    const educationHTML = education.length > 0
        ? education.map(e => `
      <div style="background:${t.surface};border:1px solid ${t.border};border-radius:12px;padding:20px;margin-bottom:16px">
        <div style="color:${t.primary};font-weight:700;margin-bottom:4px">${e.degree}</div>
        <div style="color:${t.text};font-weight:500">${e.college}</div>
        <div style="color:${t.muted};font-size:0.875rem;margin-top:4px">${[e.year, e.cgpa ? `CGPA: ${e.cgpa}` : ''].filter(Boolean).join(' · ')}</div>
      </div>
    `).join('')
        : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Portfolio of ${personalInfo.fullName}" />
  <title>${personalInfo.fullName}'s Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', sans-serif; background: ${t.bg}; color: ${t.text}; min-height: 100vh; }
    a { color: ${t.primary}; }
    nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: ${t.navBg}; backdrop-filter: blur(12px); padding: 0 5%; display: flex; align-items: center; justify-content: space-between; height: 68px; border-bottom: 1px solid ${t.border}; }
    .nav-logo { font-weight: 800; font-size: 1.25rem; color: ${t.primary}; }
    .nav-links { display: flex; gap: 28px; list-style: none; }
    .nav-links a { color: ${t.muted}; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color 0.2s; }
    .nav-links a:hover { color: ${t.primary}; }
    section { padding: 100px 5% 80px; max-width: 1200px; margin: 0 auto; }
    #hero { padding-top: 140px; display: flex; align-items: center; justify-content: space-between; gap: 60px; flex-wrap: wrap; }
    .hero-photo { width: 260px; height: 260px; border-radius: 50%; object-fit: cover; border: 4px solid ${t.primary}; box-shadow: 0 0 60px ${t.primary}66; }
    .hero-initials { width: 260px; height: 260px; border-radius: 50%; background: linear-gradient(135deg, ${t.primary}, ${t.accent}); display: flex; align-items: center; justify-content: center; font-size: 5rem; font-weight: 800; color: white; border: 4px solid ${t.primary}; box-shadow: 0 0 60px ${t.primary}66; }
    .hero-greeting { font-size: 1.2rem; color: ${t.muted}; margin-bottom: 8px; }
    .hero-name { font-size: 3.5rem; font-weight: 800; background: linear-gradient(135deg, ${t.primary}, ${t.accent}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 12px; }
    .hero-tagline { font-size: 1.15rem; color: ${t.muted}; margin-bottom: 28px; }
    .btn-primary { display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, ${t.primary}, ${t.accent}); color: white; border-radius: 10px; text-decoration: none; font-weight: 600; margin-right: 12px; transition: transform 0.2s, box-shadow 0.2s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 20px ${t.primary}55; -webkit-text-fill-color: white; }
    .btn-outline { display: inline-block; padding: 14px 28px; border: 2px solid ${t.primary}; color: ${t.primary}; border-radius: 10px; text-decoration: none; font-weight: 600; transition: all 0.2s; }
    .btn-outline:hover { background: ${t.primary}22; }
    h2 { font-size: 2rem; font-weight: 800; margin-bottom: 40px; position: relative; display: inline-block; }
    h2::after { content: ''; position: absolute; bottom: -8px; left: 0; width: 50%; height: 3px; background: linear-gradient(to right, ${t.primary}, ${t.accent}); border-radius: 2px; }
    .skills-grid { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; margin-top: 16px; }
    .about-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 40px; align-items: start; }
    .about-info { display: flex; flex-direction: column; gap: 12px; }
    .info-item { display: flex; gap: 12px; align-items: flex-start; padding: 12px; background: ${t.surface}; border: 1px solid ${t.border}; border-radius: 10px; }
    .info-icon { font-size: 1.2rem; }
    .info-label { font-size: 0.75rem; color: ${t.muted}; text-transform: uppercase; letter-spacing: 0.05em; }
    .info-value { color: ${t.text}; font-weight: 500; font-size: 0.9rem; }
    .contact-form { max-width: 600px; display: flex; flex-direction: column; gap: 16px; }
    .contact-form input, .contact-form textarea { background: ${t.surface}; border: 1.5px solid ${t.border}; border-radius: 10px; color: ${t.text}; padding: 14px 16px; font-size: 0.95rem; font-family: inherit; width: 100%; }
    .contact-form button { padding: 14px 28px; background: linear-gradient(135deg, ${t.primary}, ${t.accent}); color: white; border: none; border-radius: 10px; font-size: 1rem; font-weight: 600; cursor: pointer; }
    footer { background: ${t.navBg}; text-align: center; padding: 28px; color: ${t.muted}; font-size: 0.875rem; border-top: 1px solid ${t.border}; }
    footer a { color: ${t.muted}; text-decoration: none; margin: 0 8px; }
    footer a:hover { color: ${t.primary}; }
    .section-label { font-size: 0.85rem; color: ${t.primary}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
    @media (max-width: 768px) {
      #hero { flex-direction: column-reverse; text-align: center; }
      .hero-photo, .hero-initials { width: 180px; height: 180px; }
      .hero-name { font-size: 2.2rem; }
      .about-grid { grid-template-columns: 1fr; }
      .projects-grid { grid-template-columns: 1fr; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>
  <nav>
    <div class="nav-logo">&lt;/&gt; ${personalInfo.fullName?.split(' ')[0] || 'Portfolio'}</div>
    <ul class="nav-links">
      <li><a href="#hero">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#skills">Skills</a></li>
      ${projects.length > 0 ? '<li><a href="#projects">Projects</a></li>' : ''}
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>

  <div id="hero">
    <div>
      <div class="section-label">✦ Welcome to my Portfolio</div>
      <div class="hero-greeting">Hello, I'm</div>
      <div class="hero-name">${personalInfo.fullName || 'Your Name'}</div>
      <div class="hero-tagline">${personalInfo.tagline || personalInfo.role || 'Developer & Creator'}</div>
      <div>
        ${projects.length > 0 ? '<a href="#projects" class="btn-primary">View My Projects →</a>' : ''}
        <a href="#contact" class="btn-outline">Contact Me ✉</a>
      </div>
    </div>
    <div>
      ${personalInfo.photo
            ? `<img src="${personalInfo.photo}" alt="${personalInfo.fullName}" class="hero-photo" />`
            : `<div class="hero-initials">${initials}</div>`
        }
    </div>
  </div>

  <section id="about">
    <div class="section-label">✦ Get To Know Me</div>
    <h2>About Me</h2>
    <div class="about-grid">
      <div>
        <p style="color:${t.muted};line-height:1.8;font-size:1rem">${personalInfo.about || ''}</p>
        ${educationHTML ? `<div style="margin-top:32px"><h3 style="color:${t.text};font-size:1.1rem;font-weight:700;margin-bottom:16px">🎓 Education</h3>${educationHTML}</div>` : ''}
      </div>
      <div class="about-info">
        ${personalInfo.location ? `<div class="info-item"><span class="info-icon">📍</span><div><div class="info-label">Location</div><div class="info-value">${personalInfo.location}</div></div></div>` : ''}
        ${personalInfo.email ? `<div class="info-item"><span class="info-icon">📧</span><div><div class="info-label">Email</div><div class="info-value">${personalInfo.email}</div></div></div>` : ''}
        ${personalInfo.phone ? `<div class="info-item"><span class="info-icon">📞</span><div><div class="info-label">Phone</div><div class="info-value">${personalInfo.phone}</div></div></div>` : ''}
        ${education.length > 0 && education[0].degree ? `<div class="info-item"><span class="info-icon">🎓</span><div><div class="info-label">Degree</div><div class="info-value">${education[0].degree}</div></div></div>` : ''}
      </div>
    </div>
  </section>

  ${skills.length > 0 ? `
  <section id="skills" style="background:${t.surface};border-radius:16px;margin:0 5%;padding:60px 40px">
    <div class="section-label">✦ What I Know</div>
    <h2>Skills & Technologies</h2>
    <div class="skills-grid">${skillsHTML}</div>
  </section>` : ''}

  ${projects.length > 0 ? `
  <section id="projects">
    <div class="section-label">✦ My Work</div>
    <h2>Projects</h2>
    <div class="projects-grid">${projectsHTML}</div>
  </section>` : ''}

  <section id="contact">
    <div class="section-label">✦ Get In Touch</div>
    <h2>Contact Me</h2>
    <p style="color:${t.muted};margin-bottom:32px">Feel free to reach out — I'd love to hear from you!</p>
    ${personalInfo.email ? `<div style="margin-bottom:24px"><a href="mailto:${personalInfo.email}" style="font-size:1.1rem;font-weight:600;color:${t.primary}">${personalInfo.email}</a></div>` : ''}
    <div class="contact-form">
      <input type="text" placeholder="Your Name" disabled />
      <input type="email" placeholder="Your Email" disabled />
      <textarea rows="5" placeholder="Your Message" disabled style="resize:none"></textarea>
      <button type="button" disabled>Send Message (Static Export)</button>
    </div>
  </section>

  <footer>
    <div style="margin-bottom:12px">${socialLinks}</div>
    <div>© ${new Date().getFullYear()} ${personalInfo.fullName || 'Portfolio'}. All rights reserved.</div>
  </footer>
</body>
</html>`;
}

/**
 * Trigger file download in the browser
 */
export function downloadPortfolioHTML(data, template = 'purple-dark') {
    const html = generatePortfolioHTML(data, template);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(data.personalInfo.fullName || 'portfolio').replace(/\s+/g, '_')}_portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
