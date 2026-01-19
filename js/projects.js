// Projects functionality
document.addEventListener('DOMContentLoaded', function() {
  // Sample projects data (can be expanded or loaded from an API)
  const projectsData = [
    {
      id: 1,
      title: "ShopEase - E-commerce Platform",
      description: "A comprehensive e-commerce platform with advanced features including personalized recommendations, real-time inventory management, secure payment processing, and seamless user experience across all devices.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "Redux"],
      category: "web",
      liveLink: "https://shopease-demo.com",
      sourceLink: "https://github.com/ahmedraza/shopease"
    },
    {
      id: 2,
      title: "FlowSync - Project Management Tool",
      description: "A sophisticated project management application featuring real-time collaboration, advanced analytics, automated workflows, and customizable dashboards. Designed for teams looking to streamline their project delivery process.",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io", "D3.js"],
      category: "web",
      liveLink: "https://flowsync-demo.com",
      sourceLink: "https://github.com/ahmedraza/flowsync"
    },
    {
      id: 3,
      title: "FitLife - Health & Fitness Tracker",
      description: "A comprehensive health and fitness application with personalized workout plans, nutrition tracking, progress monitoring, and social features. Built with focus on user engagement and data visualization.",
      technologies: ["React Native", "Firebase", "Chart.js", "HealthKit API", "Redux"],
      category: "mobile",
      liveLink: "https://fitlife-demo.com",
      sourceLink: "https://github.com/ahmedraza/fitlife"
    },
    {
      id: 4,
      title: "DataViz Pro - Business Analytics",
      description: "Advanced business intelligence platform with real-time data visualization, predictive analytics, and automated reporting. Helps businesses make data-driven decisions with intuitive dashboards and insights.",
      technologies: ["Angular", "D3.js", "Python", "TensorFlow", "AWS"],
      category: "web",
      liveLink: "https://dataviz-demo.com",
      sourceLink: "https://github.com/ahmedraza/dataviz-pro"
    },
    {
      id: 5,
      title: "LearnHub - Online Learning Platform",
      description: "Interactive online learning platform with video streaming, progress tracking, certification system, and community features. Designed to provide engaging educational experiences for learners worldwide.",
      technologies: ["Next.js", "Node.js", "MongoDB", "WebRTC", "Stripe API"],
      category: "web",
      liveLink: "https://learnhub-demo.com",
      sourceLink: "https://github.com/ahmedraza/learnhub"
    },
    {
      id: 6,
      title: "Wanderlust - Travel Planning App",
      description: "Comprehensive travel planning application featuring itinerary builder, real-time flight tracking, local recommendations, and social sharing. Makes trip planning effortless and enjoyable for travelers.",
      technologies: ["React", "Express", "Mapbox API", "Geolocation API", "Airbnb API"],
      category: "web",
      liveLink: "https://wanderlust-demo.com",
      sourceLink: "https://github.com/ahmedraza/wanderlust"
    }
  ];

  // Function to render project cards
  function renderProjectCards(projects = projectsData) {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;

    // Clear existing content
    projectsGrid.innerHTML = '';

    // Create project cards
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.className = 'project-card';

      // Determine placeholder class based on project ID for variety
      const placeholderClass = `project-placeholder-${(project.id % 3) + 1}`;

      projectCard.innerHTML = `
        <div class="project-image ${placeholderClass}">
          <div class="project-overlay">
            <span>${extractProjectCategory(project.title)}</span>
          </div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tech">
            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${project.liveLink}" class="btn btn-small" target="_blank">Live Demo</a>
            <a href="${project.sourceLink}" class="btn btn-small btn-outline" target="_blank">Source Code</a>
          </div>
        </div>
      `;
      projectsGrid.appendChild(projectCard);
    });
  }

  // Helper function to extract category from title
  function extractProjectCategory(title) {
    if (title.toLowerCase().includes('ecommerce') || title.toLowerCase().includes('shop')) {
      return 'E-commerce';
    } else if (title.toLowerCase().includes('app') || title.toLowerCase().includes('tracker')) {
      return 'Mobile';
    } else if (title.toLowerCase().includes('analytics') || title.toLowerCase().includes('data')) {
      return 'Analytics';
    } else if (title.toLowerCase().includes('learning') || title.toLowerCase().includes('education')) {
      return 'Education';
    } else if (title.toLowerCase().includes('travel') || title.toLowerCase().includes('wander')) {
      return 'Travel';
    } else {
      return 'Web App';
    }
  }

  // Initialize projects
  renderProjectCards();

  // Add hover effects to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add filter functionality
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        const filter = this.getAttribute('data-filter');

        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));

        // Add active class to clicked button
        this.classList.add('active');

        // Filter projects
        if (filter === 'all') {
          renderProjectCards(projectsData);
        } else {
          const filteredProjects = projectsData.filter(project => project.category === filter);
          renderProjectCards(filteredProjects);
        }
      });
    });
  }

  // Initialize filters
  initProjectFilters();

  // Initialize scroll animations for projects
  function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }
      });
    }, observerOptions);

    projectCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.95)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.transitionDelay = `${index * 0.1}s`;

      observer.observe(card);
    });
  }

  // Initialize animations
  initProjectAnimations();
});