// Mobile Menu Functionality
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      // Toggle aria-expanded attribute for accessibility
      const isExpanded = navMenu.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
      if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// Dark Mode Toggle Functionality
function initDarkMode() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved theme preference or respect OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  let currentTheme = 'light';

  if (savedTheme) {
    currentTheme = savedTheme;
  } else if (prefersDarkScheme.matches) {
    currentTheme = 'dark';
  }

  // Apply the initial theme
  body.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  // Toggle theme function
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      body.setAttribute('data-theme', currentTheme);
      localStorage.setItem('theme', currentTheme);
      updateThemeIcon(currentTheme);

      // Dispatch a custom event when theme changes
      window.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: currentTheme } }));
    });
  }

  // Update the icon based on current theme
  function updateThemeIcon(theme) {
    if (themeToggle) {
      themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
      themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
  }

  // Listen for system preference changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      body.setAttribute('data-theme', newTheme);
      updateThemeIcon(newTheme);
    }
  });
}

// Form Validation
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  // Real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
  });

  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Validate all fields
    let isValid = true;
    inputs.forEach(input => {
      if (!validateField({ target: input })) {
        isValid = false;
      }
    });

    if (isValid) {
      // Form is valid, submit data
      submitForm(contactForm);
    } else {
      // Scroll to first error
      const firstError = contactForm.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove existing error
    clearError(e);

    // Validate based on field type and requirements
    if (field.hasAttribute('required') && !value) {
      errorMessage = `${getFieldLabel(field)} is required.`;
      isValid = false;
    } else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = 'Please enter a valid email address.';
        isValid = false;
      }
    } else if (field.name === 'name' && value && value.length < 2) {
      errorMessage = 'Name should be at least 2 characters long.';
      isValid = false;
    } else if (field.name === 'subject' && value && value.length < 5) {
      errorMessage = 'Subject should be at least 5 characters long.';
      isValid = false;
    } else if (field.name === 'message' && value && value.length < 10) {
      errorMessage = 'Message should be at least 10 characters long.';
      isValid = false;
    }

    if (!isValid) {
      showError(field, errorMessage);
    }

    return isValid;
  }

  function showError(field, message) {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');

    // Create error message element if it doesn't exist
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      errorElement.style.color = 'var(--error-color, #e74c3c)';
      errorElement.style.fontSize = 'var(--font-size-sm, 0.875rem)';
      errorElement.style.marginTop = 'var(--spacing-xs, 4px)';
      errorElement.style.fontWeight = 'var(--font-weight-medium, 500)';
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  function clearError(e) {
    const field = e.target;
    field.classList.remove('error');
    field.setAttribute('aria-invalid', 'false');

    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  function getFieldLabel(field) {
    const label = contactForm.querySelector(`label[for="${field.id}"]`);
    return label ? label.textContent.replace('*', '').trim() : field.name || field.placeholder || 'This field';
  }

  function submitForm(form) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual submission logic)
    setTimeout(() => {
      // Reset form
      form.reset();

      // Show success message
      alert('Thank you for your message! I will get back to you soon.');

      // Reset button
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }, 1500);
  }
}

// Scroll Animations
function initScrollAnimations() {
  // Options for the observer
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Create the observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation classes when element comes into view
        entry.target.classList.add('animate-in');

        // Optional: stop observing after animation triggers once
        // observer.unobserve(entry.target);
      } else {
        // Optionally remove animation classes when element goes out of view
        entry.target.classList.remove('animate-in');
      }
    });
  }, options);

  // Elements to animate
  const animateElements = document.querySelectorAll(
    '.hero, .profile-image, .ai-powered-badge, .project-card, .contact-content, .footer, h2, h3, p, .btn, .skill-category, .tech-tag'
  );

  // Observe each element
  animateElements.forEach(element => {
    observer.observe(element);
  });

  // Add CSS for animations if not already present
  const style = document.createElement('style');
  style.textContent = `
    /* Animation styles */
    .animate-in {
      animation: fadeInUpAI 0.8s ease-out forwards;
    }

    @keyframes fadeInUpAI {
      from {
        opacity: 0;
        transform: translateY(40px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* Set initial state for elements that will be animated */
    .project-card,
    .contact-content,
    .footer,
    h2,
    h3,
    p,
    .btn {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    /* Stagger animations for project cards */
    .project-card:nth-child(1) { transition-delay: 0.1s; }
    .project-card:nth-child(2) { transition-delay: 0.2s; }
    .project-card:nth-child(3) { transition-delay: 0.3s; }
    .project-card:nth-child(4) { transition-delay: 0.4s; }
    .project-card:nth-child(5) { transition-delay: 0.5s; }
    .project-card:nth-child(6) { transition-delay: 0.6s; }
  `;
  document.head.appendChild(style);
}

// Smooth Scrolling
function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        // Calculate offset to account for fixed navbar
        const offsetTop = target.offsetTop - 80; // Adjust based on navbar height

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initDarkMode();
  initFormValidation();
  initScrollAnimations();
  initSmoothScrolling();
});

// Update animations when theme changes (optional)
window.addEventListener('themeChange', function(e) {
  // Add any theme-specific animation adjustments here if needed
  console.log(`Theme changed to: ${e.detail.theme}`);
});