import plugin from 'tailwindcss/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';
import colors from 'tailwindcss/colors';
import aspectRatio from '@tailwindcss/aspect-ratio';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
// import { tailwindcssPaletteGenerator } from '@bobthered/tailwindcss-palette-generator';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: colors.sky,
        secondary: colors.emerald,
      },
      // tailwindcssPaletteGenerator({
      //   colors: ['#273c75', '#353b48'],
      //   names: ['old-primary', 'old-secondary'],
      // }),
      fontFamily: {
        primary: ['Gantari', ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        '8xl': '90rem',
        '9xl': '105rem',
        '10xl': '120rem',
      },
      zIndex: {
        1: 1,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100,
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
              '&:hover': {
                opacity: '.75',
              },
            },
            img: {
              borderRadius: defaultTheme.borderRadius.lg,
            },
          },
        },
      },
    },
  },
  plugins: [
    aspectRatio,
    forms,
    typography,
    plugin(function ({ addUtilities }) {
      const utilBgPatterns = {
        '.pattern-dots-sm': {
          'background-image': 'radial-gradient(currentColor 0.5px, transparent 0.5px)',
          'background-size': 'calc(10 * 0.5px) calc(10 * 0.5px)',
        },
        '.pattern-dots-md': {
          'background-image': 'radial-gradient(currentColor 1px, transparent 1px)',
          'background-size': 'calc(10 * 1px) calc(10 * 1px)',
        },
        '.pattern-dots-lg': {
          'background-image': 'radial-gradient(currentColor 1.5px, transparent 1.5px)',
          'background-size': 'calc(10 * 1.5px) calc(10 * 1.5px)',
        },
        '.pattern-dots-xl': {
          'background-image': 'radial-gradient(currentColor 2px, transparent 2px)',
          'background-size': 'calc(10 * 2px) calc(10 * 2px)',
        },
      };
      addUtilities(utilBgPatterns);
    }),
    plugin(function ({ addUtilities }) {
      const utilFormSwitch = {
        '.form-switch': {
          border: 'transparent',
          'background-color': colors.gray[300],
          'background-image':
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\")",
          'background-position': 'left center',
          'background-repeat': 'no-repeat',
          'background-size': 'contain !important',
          'vertical-align': 'top',
          '&:checked': {
            border: 'transparent',
            'background-color': 'currentColor',
            'background-image':
              "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e\")",
            'background-position': 'right center',
          },
          '&:disabled, &:disabled + label': {
            opacity: '.5',
            cursor: 'not-allowed',
          },
        },
      };

      addUtilities(utilFormSwitch);
    }),
  ],
};
