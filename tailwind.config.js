/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        ewha: {
          green: '#00462A',
          light: '#E8F5E9',
        },
        background: "rgb(var(--color-background) / <alpha-value>)",
        foreground: "rgb(var(--color-foreground) / <alpha-value>)",
        primary: {
          50: 'hsl(155, 100%, 95%)',
          100: 'hsl(155, 100%, 90%)',
          200: 'hsl(155, 95%, 80%)',
          300: 'hsl(155, 90%, 70%)',
          400: 'hsl(155, 85%, 60%)',
          500: 'hsl(155, 80%, 50%)',
          600: 'hsl(155, 75%, 40%)',
          700: 'hsl(155, 70%, 30%)',
          800: 'hsl(155, 65%, 20%)',
          900: 'hsl(155, 60%, 15%)',
        },
        secondary: {
          50: 'hsl(210, 100%, 95%)',
          100: 'hsl(210, 100%, 90%)',
          200: 'hsl(210, 95%, 80%)',
          300: 'hsl(210, 90%, 70%)',
          400: 'hsl(210, 85%, 60%)',
          500: 'hsl(210, 80%, 50%)',
          600: 'hsl(210, 75%, 40%)',
          700: 'hsl(210, 70%, 30%)',
          800: 'hsl(210, 65%, 20%)',
          900: 'hsl(210, 60%, 15%)',
        },
        accent: {
          50: 'hsl(45, 100%, 95%)',
          100: 'hsl(45, 100%, 90%)',
          200: 'hsl(45, 95%, 80%)',
          300: 'hsl(45, 90%, 70%)',
          400: 'hsl(45, 85%, 60%)',
          500: 'hsl(45, 80%, 50%)',
          600: 'hsl(45, 75%, 40%)',
          700: 'hsl(45, 70%, 30%)',
          800: 'hsl(45, 65%, 20%)',
          900: 'hsl(45, 60%, 15%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-1': ['3.5rem', { lineHeight: '1.1', fontWeight: '800' }],
        'display-2': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-3': ['2.5rem', { lineHeight: '1.2', fontWeight: '700' }],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, hsl(155, 80%, 50%) 0%, hsl(155, 70%, 30%) 100%)',
        'gradient-dark': 'linear-gradient(135deg, hsl(210, 30%, 15%) 0%, hsl(210, 40%, 8%) 100%)',
        'gradient-shine': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'glass-lg': '0 12px 48px 0 rgba(31, 38, 135, 0.2)',
        'neon': '0 0 20px rgba(0, 255, 200, 0.3)',
        'glow': '0 0 30px -5px rgba(0, 70, 42, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 70, 42, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 70, 42, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
