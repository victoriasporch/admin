import type { Config } from 'tailwindcss';
import typo from '@tailwindcss/typography';
import daisyui from 'daisyui';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#7a3c8f',
      },
    },
  },
  plugins: [typo, daisyui],
  daisyui: {
    themes: ['light'],
  },
} satisfies Config;
