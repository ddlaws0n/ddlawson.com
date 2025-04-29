import type { APIRoute } from 'astro';
import sharp from 'sharp';

// Define color schemes
const lightColors = {
  stopColor1: '#bae6fd', // sky-200
  stopColor2: '#38bdf8', // sky-400
  textColor: '#0c4a6e', // sky-900
  borderColor: '#082f49',
};

const darkColors = {
  stopColor1: '#0369a1', // sky-700
  stopColor2: '#0c4a6e', // sky-900
  textColor: '#bae6fd', // sky-200
  borderColor: '#e0f2fe',
};

// Function to generate SVG content based on colors
const generateSvgContent = (colors: typeof lightColors): string =>
  `
<svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.stopColor1};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.stopColor2};stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="500" height="500" fill="url(#gradient)" stroke="${colors.borderColor}" stroke-width="50"/>
  <text x="50" y="450" dominant-baseline="auto" text-anchor="start" font-family="sans-serif" font-size="365" fill="${colors.textColor}">
    dl
  </text>
</svg>
`.trim();

export const GET: APIRoute = async ({ params, url }) => {
  const format = params.format;
  const theme = url.searchParams.get('theme');

  // Select color scheme based on theme
  const colors = theme === 'dark' ? darkColors : lightColors;

  // Generate SVG content using the selected color scheme
  const svgContent = generateSvgContent(colors);

  if (format === 'png') {
    // Convert the SVG to PNG using sharp for PNG format
    const pngBuffer = await sharp(Buffer.from(svgContent)).png().toBuffer();

    return new Response(pngBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=2592000', // 30 days
      },
    });
  } else if (format === 'svg') {
    // Serve as SVG format
    return new Response(svgContent, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=2592000', // 30 days
      },
    });
  } else {
    // Return 404 for unrecognized formats
    return new Response('Not Found', { status: 404 });
  }
};
