import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        fadeIn: { from: { backgroundColor: '#00000000' }, to: { backgroundColor: '#00000070' } },
        lightFadeIn: { from: { backgroundColor: '#00000000' }, to: { backgroundColor: '#00000040' } },
        slideIn: { from: { right: '-200px' }, to: { right: '0px' } },
      },
      animation: {
        slideIn: 'slideIn 0.2s linear',
        fadeIn: 'fadeIn 0.2s ease',
        lightFadeIn: 'lightFadeIn 0.2s ease',
      },
    },
  },
  plugins: [],
} satisfies Config;
