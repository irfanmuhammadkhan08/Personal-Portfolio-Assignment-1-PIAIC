// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
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
  themeToggle.addEventListener('click', function() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon(currentTheme);
  });

  // Update the icon based on current theme
  function updateThemeIcon(theme) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
  }
});