/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './shared/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#006884',
        lightPrimary: "#E0F1F8",
        secondary: '#DBA40E',
        lightSecondary: "#FBE89A",
        danger: "#DB221F",
        lightDanger: "#FFE6D4",
      },
      transitionProperty: {
        'height': 'height',
      },

      keyframes: {
        'change-step-color': {
          '0%': { backgroundColor: '#ffffff', borderColor: '#a0a4ac', color: '#a0a4ac' },
          '100%': { backgroundColor: '#f5f5f5', borderColor: '#040404', color: '#040404' }
        }
      },
      animation: {
        'change-step-color': 'change-step-color 0.8s linear',
      }
    },
  },
  plugins: [],
  important: true,
  corePlugins: {
    preflight: false,
  },
};
