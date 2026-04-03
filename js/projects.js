/* ============================================================
   projects.js — Project data and immersive card rendering
   ============================================================ */
'use strict';

const projectsData = [
  {
    id: 1,
    title: 'AgentFlow',
    subtitle: 'AI Task Automation Engine',
    description: 'Intelligent multi-agent system that automates complex business workflows. Supports task decomposition, tool calling, memory management, and self-correcting execution pipelines.',
    problem:  'Businesses lose hours to repetitive multi-step tasks that span multiple tools and require human coordination.',
    solution: 'Multi-agent orchestration system using LLMs to autonomously break down, delegate, and execute complex workflows.',
    impact:   '70% reduction in workflow execution time across 10+ business clients.',
    technologies: ['Python', 'OpenAI API', 'LangChain', 'FastAPI', 'ChromaDB'],
    category: 'ai',
    icon: 'fa-robot',
    color: '#00d4ff',
    liveLink: '#',
    sourceLink: '#'
  },
  {
    id: 2,
    title: 'DocuBot',
    subtitle: 'RAG Document Assistant',
    description: 'Retrieval-augmented generation chatbot that answers questions from uploaded PDFs. Features semantic search, context-aware responses, and multi-document support with source citations.',
    problem:  'Knowledge workers spend hours searching through lengthy documents to extract specific information.',
    solution: 'RAG pipeline that indexes documents semantically and retrieves precise context for LLM-generated answers.',
    impact:   'Document query time reduced from hours to seconds; deployed for 5+ enterprise clients.',
    technologies: ['Python', 'Claude API', 'LlamaIndex', 'Pinecone', 'Streamlit'],
    category: 'ai',
    icon: 'fa-file-alt',
    color: '#7b2fff',
    liveLink: '#',
    sourceLink: '#'
  },
  {
    id: 3,
    title: 'PromptLab',
    subtitle: 'Prompt Engineering Toolkit',
    description: 'Web-based toolkit for designing, testing, and optimizing AI prompts. Supports chain-of-thought templates, A/B testing, version history, and performance scoring across multiple LLM providers.',
    problem:  'Prompt engineers lack structured tools to systematically test and optimize prompts across different LLMs.',
    solution: 'Visual prompt IDE with A/B testing, version control, and automated quality scoring metrics.',
    impact:   'Improved prompt quality scores by 40% for users in beta testing phase.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'OpenAI API', 'Gemini API'],
    category: 'tools',
    icon: 'fa-flask',
    color: '#ff6b35',
    liveLink: '#',
    sourceLink: '#'
  },
  {
    id: 4,
    title: 'BizMind',
    subtitle: 'AI Business Advisor',
    description: 'Conversational AI assistant for small business owners providing personalized advice on marketing, finance, and operations — with persistent memory for context-aware, ongoing guidance.',
    problem:  'Small business owners lack access to affordable, personalized business consulting.',
    solution: 'Role-based LLM advisor with persistent memory that learns your business context over time.',
    impact:   '25+ business owners using it for strategic decisions; 4.8/5 user satisfaction.',
    technologies: ['Python', 'Claude API', 'FastAPI', 'PostgreSQL', 'React'],
    category: 'ai',
    icon: 'fa-briefcase',
    color: '#00d4ff',
    liveLink: '#',
    sourceLink: '#'
  },
  {
    id: 5,
    title: 'ContentForge',
    subtitle: 'AI Content Generation Platform',
    description: 'AI-powered content creation platform generating blogs, social posts, product descriptions, and email campaigns with tone customization, SEO optimization, and multi-language output.',
    problem:  'Content teams struggle to produce consistent, high-quality content at scale across channels.',
    solution: 'Unified AI platform with tone profiles, SEO analysis, and multi-format output generation.',
    impact:   'Content production speed 5x faster; used by 3 digital marketing agencies.',
    technologies: ['Python', 'GPT-4o', 'DALL-E 3', 'Next.js', 'Tailwind CSS'],
    category: 'tools',
    icon: 'fa-pen-fancy',
    color: '#7b2fff',
    liveLink: '#',
    sourceLink: '#'
  },
  {
    id: 6,
    title: 'ResumeAI',
    subtitle: 'Smart Resume Builder',
    description: 'Intelligent resume builder using AI to tailor CVs for specific job descriptions. Analyzes postings, suggests skill keywords, scores ATS compatibility, and auto-generates cover letters.',
    problem:  'Job seekers get filtered out by ATS systems before their resume reaches a human reviewer.',
    solution: 'AI-powered resume tailoring engine that matches skills to JD keywords and scores ATS compatibility.',
    impact:   'Users report 3x higher interview callback rates after using the tool.',
    technologies: ['Python', 'OpenAI API', 'HTML5', 'CSS3', 'JavaScript'],
    category: 'web',
    icon: 'fa-id-card',
    color: '#ff6b35',
    liveLink: '#',
    sourceLink: '#'
  }
];

const categoryLabels = { ai: 'Agentic AI', web: 'Web App', tools: 'AI Tools' };

function renderProjects(projects = projectsData) {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  projects.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-index', index);

    const catLabel = categoryLabels[project.category] || 'Project';

    card.innerHTML = `
      <div class="card-glow"></div>
      <div class="card-accent-line" style="background: ${project.color}"></div>

      <div class="project-card-header">
        <div class="project-icon-wrapper" style="--icon-color: ${project.color}">
          <i class="fas ${project.icon}"></i>
        </div>
        <span class="project-category-badge">${catLabel}</span>
      </div>

      <div class="project-card-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-subtitle">${project.subtitle}</p>
        <p class="project-description">${project.description}</p>

        <div class="project-case-study">
          <div class="case-item">
            <span class="case-label"><i class="fas fa-exclamation-circle"></i> Problem</span>
            <p>${project.problem}</p>
          </div>
          <div class="case-item">
            <span class="case-label"><i class="fas fa-lightbulb"></i> Solution</span>
            <p>${project.solution}</p>
          </div>
          <div class="case-item case-impact">
            <span class="case-label"><i class="fas fa-chart-line"></i> Impact</span>
            <p>${project.impact}</p>
          </div>
        </div>

        <div class="project-tech">
          ${project.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="project-card-footer">
        <a href="${project.liveLink}" class="btn-card btn-card-primary" target="_blank" rel="noopener noreferrer"
           aria-label="View live demo of ${project.title}">
          <i class="fas fa-external-link-alt"></i> Live Demo
        </a>
        <a href="${project.sourceLink}" class="btn-card btn-card-ghost" target="_blank" rel="noopener noreferrer"
           aria-label="View source code of ${project.title}">
          <i class="fab fa-github"></i> Source
        </a>
      </div>
    `;

    grid.appendChild(card);
  });

  // Staggered reveal on scroll
  requestAnimationFrame(() => {
    const cards = grid.querySelectorAll('.project-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.getAttribute('data-index')) || 0;
          setTimeout(() => entry.target.classList.add('visible'), idx * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    window.__cardObserver = observer;
    cards.forEach(card => observer.observe(card));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
});
