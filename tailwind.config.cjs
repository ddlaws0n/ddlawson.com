const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');
// const { tailwindcssPaletteGenerator } = require('@bobthered/tailwindcss-palette-generator');

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
        '.polka-light': {
          'background-image':
            'radial-gradient(rgba(0,116,139,1) 1px, transparent 1px), radial-gradient(rgba(0,116,139,1) 1px, rgba(240, 249, 255, 1) 1px);',
          'background-size': '20px 20px',
          'background-position': '0 0, 10px 10px;',
          mask: 'linear-gradient(to bottom,rgba(240, 249, 255, 1),rgba(240, 249, 255, 0.1))',
        },
        // Having a dark variant here is an ugly, temporary workaround which I'll get to resolving at some point!
        '.polka-dark': {
          'background-image':
            'radial-gradient(rgba(0,116,139,1) 1px, transparent 1px), radial-gradient(rgba(0,116,139,1) 1px, rgba(15, 23, 42, 1) 1px);',
          'background-size': '20px 20px',
          'background-position': '0 0, 10px 10px;',
          mask: 'linear-gradient(to bottom,rgba(15, 23, 42, 1),rgba(15, 23, 42, 0.1))',
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
