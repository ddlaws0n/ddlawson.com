import type { APIRoute } from 'astro';
import sharp from 'sharp';
import toIco from 'to-ico';
import baseSvgContent from '@/assets/icons/badge.svg?raw';

const lightColors = {
  stopColor1: '#bae6fd', // sky-200
  stopColor2: '#38bdf8', // sky-500
  textColor: '#0c4a6e', // sky-900
  borderColor: '#082f49', // sky-950
};

const darkColors = {
  stopColor1: '#082f49', // sky-950
  stopColor2: '#071e34', // custom dark
  textColor: '#bae6fd', // sky-200
  borderColor: '#38bdf8', // sky-500
};

const colorMappings = [
  { light: lightColors.stopColor1, dark: darkColors.stopColor1, attribute: 'stop-color' },
  { light: lightColors.stopColor2, dark: darkColors.stopColor2, attribute: 'stop-color' },
  { light: lightColors.textColor, dark: darkColors.textColor, attribute: 'fill' },
  { light: lightColors.borderColor, dark: darkColors.borderColor, attribute: 'stroke' },
];

export const GET: APIRoute = async ({ params, url }) => {
  const { ext } = params;
  const theme = url.searchParams.get('theme') || 'light'; // Default to light theme

  if (!['svg', 'png', 'ico'].includes(ext ?? '')) {
    return new Response('Invalid ext specified. Use "svg", "png", or "ico".', {
      status: 400,
    });
  }

  try {
    let svgContent = baseSvgContent;

    if (theme === 'dark') {
      for (const { light, dark, attribute } of colorMappings) {
        const regex = new RegExp(`${attribute}="${light}"`, 'g');
        svgContent = svgContent.replace(regex, `${attribute}="${dark}"`);
      }
    }

    let body: Buffer | string;
    let contentType: string;

    if (ext === 'svg') {
      body = svgContent;
      contentType = 'image/svg+xml';
    } else if (ext === 'png') {
      body = await sharp(Buffer.from(svgContent))
        .resize(192, 192) // Standard favicon size
        .png()
        .toBuffer();
      contentType = 'image/png';
    } else {
      // ext === 'ico'
      const sizes = [16, 32, 48];
      const pngBuffers = await Promise.all(
        sizes.map((size) => sharp(Buffer.from(svgContent)).resize(size, size).png().toBuffer())
      );
      body = await toIco(pngBuffers);
      contentType = 'image/x-icon';
    }

    // Set headers
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    return new Response(body, {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error('Error generating favicon:', error);
    return new Response('Error generating favicon.', { status: 500 });
  }
};
