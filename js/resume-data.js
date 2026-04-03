/* ============================================================
   resume-data.js — Single Source of Truth
   Update this file → resume.html & cover-letter.html auto-update
   ============================================================ */
'use strict';

window.resumeData = {

  /* ── PERSONAL INFO ──────────────────────────────────────── */
  personal: {
    name:       'Irfan Muhammad Khan',
    title:      'Agentic AI Developer & Problem Solver',
    tagline:    'AI-Powered Entrepreneur',
    email:      'irfanmuhammadk786@gmail.com',
    phone:      '+92 315 2185186',
    whatsapp:   'https://wa.me/923152185186',
    location:   'North Karachi, Karachi, Pakistan',
    linkedin:   'https://www.linkedin.com/in/irfanmuhammadkhan08',
    github:     'https://github.com/irfanmuhammadkhan08',
    twitter:    'https://x.com/irfanimk08',
    linktree:   'https://linktr.ee/IrfanIMK',
    portfolio:  'https://linktr.ee/IrfanIMK',
    availability: 'Open to freelance & full-time AI roles'
  },

  /* ── PROFESSIONAL SUMMARY ───────────────────────────────── */
  summary: `Passionate Agentic AI Developer with deep expertise in LLM integration, multi-agent workflows, prompt engineering, and intelligent system design. PIAIC-trained with a track record of delivering 50+ real-world AI projects for global clients. Uniquely combines technical AI development with business acumen (B.Com background) to build solutions that drive measurable, practical impact.`,

  /* ── EXPERIENCE ─────────────────────────────────────────── */
  experience: [
    {
      role:        'Freelance AI Developer',
      company:     'Self-Employed — Remote',
      period:      '2024 — Present',
      type:        'work',
      icon:        'fa-briefcase',
      highlights: [
        'Delivered custom Agentic AI and LLM-powered solutions for 10+ global business clients',
        'Designed and deployed intelligent chatbots, RAG systems, and automated workflow engines',
        'Integrated OpenAI, Claude, and Gemini APIs into existing client platforms and pipelines',
        'Maintained 100% client satisfaction rate with consistent on-time, in-scope delivery',
        'Produced AI-generated content workflows 5× faster than traditional methods for 3 agencies'
      ]
    },
    {
      role:        'AI Developer Student',
      company:     'PIAIC — Presidential Initiative for AI & Computing',
      period:      '2023 — Present',
      type:        'education-work',
      icon:        'fa-graduation-cap',
      highlights: [
        'Enrolled in Pakistan\'s premier government-backed AI education program',
        'Built 50+ AI projects spanning RAG pipelines, multi-agent systems, and chatbot applications',
        'Mastered agentic AI frameworks, LangChain, LlamaIndex, and modern LLM architectures',
        'Developed expertise in prompt engineering: chain-of-thought, few-shot, and role prompting',
        'Hands-on experience with OpenAI, Anthropic Claude, and Google Gemini production APIs'
      ]
    },
    {
      role:        'Business Operations Manager',
      company:     'Self-Employed — Karachi, Pakistan',
      period:      '2020 — 2023',
      type:        'work',
      icon:        'fa-store',
      highlights: [
        'Managed e-commerce operations and digital marketing campaigns with measurable ROI',
        'Led a team of 5+ across day-to-day business operations and customer relations',
        'Scaled online sales channels using data-driven strategies and digital tools',
        'Built strong foundation in business analysis, strategic planning, and stakeholder management'
      ]
    }
  ],

  /* ── EDUCATION ──────────────────────────────────────────── */
  education: [
    {
      degree:      'Agentic AI Development Program',
      institution: 'PIAIC — Presidential Initiative for AI & Computing',
      period:      '2023 — Present',
      detail:      'Focus: LLMs, Agentic Systems, Python, Prompt Engineering, Multi-Agent Workflows'
    },
    {
      degree:      'Bachelor of Commerce (B.Com)',
      institution: 'University of Karachi — Karachi, Pakistan',
      period:      '2017 — 2020',
      detail:      'Business Administration, Accounting, Finance, Economics & Strategic Management'
    }
  ],

  /* ── SKILLS ─────────────────────────────────────────────── */
  skills: {
    'AI & LLMs': [
      'Agentic AI Systems', 'LLM Integration', 'Multi-Agent Workflows',
      'RAG Systems', 'OpenAI API', 'Claude API', 'Gemini API', 'AI Chatbots'
    ],
    'Prompt Engineering': [
      'Chain-of-Thought', 'Few-Shot Learning', 'Zero-Shot Prompting',
      'Role Prompting', 'System Prompt Design', 'Instruction Tuning'
    ],
    'Programming & Dev': [
      'Python', 'HTML5', 'CSS3', 'JavaScript',
      'FastAPI', 'REST APIs', 'Git & GitHub'
    ],
    'AI Tools & Platforms': [
      'ChatGPT', 'Claude Code', 'Cursor AI', 'LangChain',
      'LlamaIndex', 'Hugging Face', 'Perplexity AI'
    ],
    'Business & Leadership': [
      'Project Management', 'Team Leadership', 'Strategic Planning',
      'Digital Marketing', 'E-commerce', 'Business Analysis'
    ]
  },

  /* ── LANGUAGES ──────────────────────────────────────────── */
  languages: [
    { lang: 'English', level: 'Professional Proficiency' },
    { lang: 'Urdu',    level: 'Native / Full Professional' }
  ],

  /* ── FEATURED PROJECTS (top 3 for resume) ──────────────── */
  featuredProjects: [
    {
      name:   'AgentFlow — AI Task Automation Engine',
      tech:   'Python · OpenAI API · LangChain · FastAPI · ChromaDB',
      impact: 'Reduced workflow execution time by 70% for 10+ business clients via multi-agent orchestration'
    },
    {
      name:   'DocuBot — RAG Document Assistant',
      tech:   'Python · Claude API · LlamaIndex · Pinecone · Streamlit',
      impact: 'Cut document query time from hours to seconds; deployed for 5+ enterprise clients'
    },
    {
      name:   'ContentForge — AI Content Generation Platform',
      tech:   'Python · GPT-4o · DALL-E 3 · Next.js · Tailwind CSS',
      impact: '5× faster content production; adopted by 3 digital marketing agencies'
    }
  ],

  /* ── COVER LETTER DEFAULTS ──────────────────────────────── */
  coverLetter: {
    defaultRole:    'Agentic AI Developer',
    defaultCompany: 'Your Company',
    defaultHiring:  'Hiring Manager',
    openingLine: `I am writing to express my strong interest in the {ROLE} position at {COMPANY}. As an Agentic AI Developer trained at PIAIC with hands-on experience building 50+ real-world AI systems, I am confident that my skills in LLM integration, multi-agent workflows, and prompt engineering align perfectly with your requirements.`,
    body: [
      `Over the past two years, I have designed and delivered production-grade AI solutions for global clients — from intelligent RAG chatbots that reduced document query time from hours to seconds, to multi-agent automation engines that cut workflow execution time by 70%. My work spans the full AI development lifecycle: system design, API integration, prompt optimization, and deployment.`,
      `What sets me apart is my ability to bridge the gap between technical AI capability and real business value. With a B.Com background complementing my deep AI expertise, I understand both the engineering and the commercial context of the solutions I build. I don't just write code — I solve business problems with AI.`,
      `I am proficient in Python, LangChain, LlamaIndex, FastAPI, and all major LLM APIs (OpenAI, Anthropic Claude, Google Gemini). I bring a collaborative, deadline-driven work ethic with a 100% client satisfaction track record across 10+ projects.`
    ],
    closingLine: `I would welcome the opportunity to discuss how my skills can contribute to {COMPANY}'s mission. Thank you for your time and consideration.`
  }

};
