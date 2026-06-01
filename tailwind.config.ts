import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './app/**/*.{ts,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9B3FC8',
          light: '#C47DE8',
          pale: '#E8C4F5',
          dark: '#5B1A8A',
        },
        accent: {
          DEFAULT: '#E879A0',
          deep: '#C2185B',
        },
        brand: {
          offwhite: '#FAF5FF',
          text: '#2D0D4E',
          muted: '#6B3F8A',
          surface: '#F3E8FF',
        },
        dark: {
          bg: '#12021E',
          surface: '#1E0A30',
          elevated: '#2A1040',
          text: '#F0E0FF',
          muted: '#C4A0E0',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
        'card-lg': '24px',
      },
      boxShadow: {
        card: '0 8px 30px rgba(91,26,138,0.10)',
        'card-dark': '0 8px 30px rgba(0,0,0,0.45)',
      },
    },
  },
  plugins: [],
} satisfies Config;
