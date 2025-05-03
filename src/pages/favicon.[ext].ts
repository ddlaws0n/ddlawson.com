import fs from 'node:fs/promises';
import path from 'node:path';
import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { getProjectRootDir } from '@/utils/directories';

const darkColors = {
  stopColor1: '#0369a1', // sky-700
  stopColor2: '#0c4a6e', // sky-900
  textColor: '#bae6fd', // sky-200
  borderColor: '#e0f2fe', // sky-100
};

const svgFilePath = path.join(getProjectRootDir(), 'src', 'assets/icons/badge.svg');

export const GET: APIRoute = async ({ params, url }) => {
  const { ext } = params;
  const theme = url.searchParams.get('theme') || 'light'; // Default to light theme

  if (ext !== 'svg' && ext !== 'png') {
    return new Response('Invalid ext specified. Use "svg" or "png".', {
      status: 400,
    });
  }

  try {
    const baseSvgContent = await fs.readFile(svgFilePath, 'utf-8');
    let svgContent = baseSvgContent;

    if (theme === 'dark') {
      svgContent = svgContent
        .replace(/stop-color="#bae6fd"/g, `stop-color="${darkColors.stopColor1}"`)
        .replace(/stop-color="#38bdf8"/g, `stop-color="${darkColors.stopColor2}"`)
        .replace(/fill="#0c4a6e"/g, `fill="${darkColors.textColor}"`)
        .replace(/stroke="#082f49"/g, `stroke="${darkColors.borderColor}"`);
    }

    // Set headers
    const headers = new Headers();
    headers.set('Content-Type', ext === 'svg' ? 'image/svg+xml' : 'image/png');
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    if (ext === 'svg') {
      return new Response(svgContent, {
        status: 200,
        headers: headers,
      });
    } else {
      const pngBuffer = await sharp(Buffer.from(svgContent))
        .resize(192, 192) // Standard favicon size
        .png()
        .toBuffer();

      return new Response(pngBuffer, {
        status: 200,
        headers: headers,
      });
    }
  } catch (error) {
    console.error('Error generating favicon:', error);
    return new Response('Error generating favicon.', { status: 500 });
  }
};
