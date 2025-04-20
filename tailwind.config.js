// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary)',        // #e30613
        background: 'var(--background)',  // #ffffff
        textMain: 'var(--text-main)',     // #1f1f1f
        muted: 'var(--muted)',            // #f3f4f6
        border: 'var(--border)'           // #e5e7eb
      }
    }
  },
  plugins: [],
};