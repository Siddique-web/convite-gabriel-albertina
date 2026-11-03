/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        linen: '#F1E9DE',
        parchment: '#EAE0D2',
        ink: '#2E2A24',
        night: '#17110D',
        sand: '#D9C9AE',
        gold: {
          DEFAULT: '#B4863C',
          light: '#D9B978',
          bright: '#F5DC9A',
          dark: '#8C6A2C',
        },
        wine: {
          DEFAULT: '#6E2A38',
          light: '#8C4152',
        },
        sage: '#5A5440',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        name: ['"Great Vibes"', 'cursive'],
        script: ['"Great Vibes"', 'cursive'],
        monogram: ['"Great Vibes"', 'cursive'],
        accent: ['"Great Vibes"', 'cursive'],
        body: ['Lora', 'Georgia', 'serif'],
        label: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.22em',
      },
    },
  },
  plugins: [],
}
