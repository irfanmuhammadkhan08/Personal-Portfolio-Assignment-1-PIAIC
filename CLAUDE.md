# Portfolio Website

A modern, minimal portfolio website to showcase web development projects built with HTML, CSS, and vanilla JavaScript.

## Features

- **Modern Design**: Clean, minimalist aesthetic with attention to typography and spacing
- **Dark Mode Support**: Automatic dark/light mode based on system preference with manual toggle
- **Responsive Layout**: Mobile-first design that works on all device sizes
- **Project Showcase**: Dedicated section to highlight key projects with descriptions and links
- **Fast Loading**: Optimized assets and minimal JavaScript for quick load times
- **Accessibility**: Semantic HTML and proper ARIA attributes for screen readers

## Tech Stack

- **HTML5**: Semantic markup for content structure
- **CSS3**: Flexbox/Grid for layouts, custom properties for theming, animations
- **Vanilla JavaScript**: No frameworks - pure ES6+ for interactivity and functionality

## Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   ├── styles.css      # Main stylesheet
│   └── themes.css      # Dark/light mode themes
├── js/
│   ├── main.js         # Main JavaScript file
│   ├── theme-toggle.js # Theme switching functionality
│   └── projects.js     # Project display logic
├── assets/
│   ├── images/         # Project screenshots and personal photos
│   └── icons/          # SVG icons and favicons
└── CLAUDE.md           # This documentation file
```

## Setup Instructions

1. Clone or download the repository
2. Open `index.html` in a browser to view the portfolio
3. Customize content in HTML/CSS/JS files as needed

## Customization Guide

### Personal Information
- Update name, title, and bio in `index.html`
- Replace contact information and social media links
- Add your own profile picture in `assets/images/`

### Projects Section
- Add project details in the projects array in `js/projects.js`
- Include project name, description, technologies, and links
- Add project screenshots to `assets/images/`

### Color Scheme
- Modify CSS custom properties in `css/themes.css` for color customization
- Primary, secondary, and accent colors can be adjusted

## Design System

A structured design system guides the development of the portfolio website, ensuring consistency and efficiency.

### Color Palette
- **Primary**: Blue (#3498db) - Used for main interactive elements, prominent headings, and key accents.
- **Secondary**: Purple (#9b59b6) - Used for complementary accents, secondary actions, and subtle highlights.
- **Neutral**: Grayscale tones for text, backgrounds, and borders to ensure readability and visual hierarchy.

### Spacing Scale
Based on an 8px grid system, ensuring consistent vertical and horizontal rhythm.
- **Base Unit**: `8px`
- **Scale**: `8px, 16px, 24px, 32px, 48px, 64px` for margins, paddings, and component sizing.

### Typography Scale
A responsive typographic scale to maintain hierarchy and readability across devices.
- **Font Family**: (e.g., 'Inter', sans-serif) - Modern and legible for all content.
- **Headings (H1-H6)**: Defined with specific `font-size`, `line-height`, and `font-weight` for clear hierarchy.
- **Body Text**: Optimized for readability with appropriate `font-size` and `line-height`.
- **Utility Classes**: For smaller text, captions, or emphasized text.

### Component Patterns
Reusable UI components designed for consistency and efficiency.
- **Buttons**: Primary, secondary, and tertiary styles with defined states (hover, active, disabled).
- **Navigation**: Responsive navigation bar with clear link states and mobile toggle.
- **Cards**: Consistent layout for showcasing projects, articles, or testimonials.
- **Forms**: Standardized input fields, labels, and validation feedback.

## Dark Mode Implementation

The portfolio includes a robust dark mode implementation:
- System preference detection using `prefers-color-scheme`
- Manual toggle switch in the header
- Smooth transitions between modes
- Local storage to remember user preference

## Performance Considerations

- Images are optimized and properly sized
- Minimal JavaScript for core functionality
- Efficient CSS selectors and layout methods
- Lazy loading for images (if implemented)

## Browser Support

- Modern browsers supporting CSS Grid/Flexbox
- ES6+ JavaScript features
- Recommended: Chrome, Firefox, Safari, Edge (latest versions)

## Current Goals

My current development goals for the portfolio website include:
1. Build responsive navigation
2. Create animated hero section
3. Add projects grid
4. Build contact form
5. Implement dark mode

## Contributing

This is a personal portfolio project, but suggestions and improvements are welcome through issues or pull requests.

## License

MIT License - feel free to use as inspiration for your own portfolio.