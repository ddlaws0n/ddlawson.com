// src/scripts/theme-handler.ts

// Function to update favicon links based on theme
function updateFavicon(doc: Document = document) {
  // Specify Document type
  const isDark = doc.documentElement.classList.contains('dark');
  const svgLink = doc.getElementById('favicon-svg'); // Select only the SVG link

  // Check if svgLink is an HTMLLinkElement before accessing href
  if (svgLink instanceof HTMLLinkElement) {
    svgLink.href = isDark ? '/favicon.svg?theme=dark' : '/favicon.svg'; // Update SVG href with query param
  }
}

// IIFE: Set initial theme class and call updateFavicon
(function () {
  const theme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (theme === 'dark' || (!theme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateFavicon(); // Set initial favicon based on theme
})();

// Update theme class and favicon before swapping pages (View Transitions)
document.addEventListener('astro:before-swap', (event: Event) => {
  // Type the event parameter
  // Ensure the new document inherits the current theme class
  // Use type assertion for event.newDocument as before
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newDocument = (event as any).newDocument as Document;
  if (document.documentElement.classList.contains('dark')) {
    newDocument.documentElement.classList.add('dark');
  } else {
    newDocument.documentElement.classList.remove('dark');
  }
  updateFavicon(newDocument); // Update favicon for the incoming page
});

// Function to update the theme toggle button icon
function updateThemeIcon() {
  const isDark = document.documentElement.classList.contains('dark');
  const themeIcon = document.getElementById('theme-icon');
  // Check if themeIcon is an HTMLElement before setting attribute (though setAttribute is general)
  if (themeIcon instanceof HTMLElement) {
    themeIcon.setAttribute('name', isDark ? 'tabler:sun' : 'tabler:moon');
  }
}

// Function to attach the theme toggle click handler
function attachThemeToggleHandler() {
  const toggle = document.querySelector<HTMLElement>('[data-aw-toggle-color-scheme]'); // Specify HTMLElement type
  // Check if toggle is an HTMLElement before assigning onclick
  if (toggle) {
    // Check for null first
    toggle.onclick = function () {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateThemeIcon(); // Update toggle button icon
      updateFavicon(); // Update favicon when theme is toggled
    };
  }
}

// Function to initialize theme UI elements
function initializeThemeUI() {
  updateThemeIcon();
  attachThemeToggleHandler();
  // Initial favicon update is handled in the IIFE above
}

// Event listeners to initialize theme UI on initial load and after page swaps
document.addEventListener('DOMContentLoaded', initializeThemeUI);
document.addEventListener('astro:after-swap', initializeThemeUI);
