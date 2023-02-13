const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const svgToDataUri = require('mini-svg-data-uri');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');
const { tailwindcssPaletteGenerator } = require('@bobthered/tailwindcss-palette-generator');

/** @type {import('tailwindcss').Config} */
module.exports = {
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
        // sans: ['Nunito', ...defaultTheme.fontFamily.sans],
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
      animation: {
        blob: 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -10px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'bg-grid': (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}" stroke-dasharray="5 3" transform="scale(1, -1)"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme('backgroundColor')), type: 'color' }
      );
    },
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
        '.patterns-diagonal': {
          'background-image': 'repeating-linear-gradient(45deg, #444cf7 0, #444cf7 1px, #e5e5f7 0, #e5e5f7 50%);',
          'background-size': '10px 10px;',
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
