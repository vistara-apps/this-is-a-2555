/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220, 15%, 8%)',
        surface: 'hsl(220, 15%, 12%)',
        surfaceHover: 'hsl(220, 15%, 16%)',
        text: 'hsl(220, 15%, 95%)',
        textMuted: 'hsl(220, 15%, 65%)',
        primary: 'hsl(240, 80%, 60%)',
        primaryHover: 'hsl(240, 80%, 70%)',
        accent: 'hsl(140, 60%, 45%)',
        accentHover: 'hsl(140, 60%, 55%)',
        border: 'hsl(220, 15%, 20%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      boxShadow: {
        'soft': '0 1px 3px 0px hsla(0, 0%, 0%, 0.3)',
        'medium': '0 4px 6px -1px hsla(0, 0%, 0%, 0.4), 0 2px 4px -2px hsla(0, 0%, 0%, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.25, 0.1, 0.25, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}