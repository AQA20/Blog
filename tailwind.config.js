/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        noto: ['Noto', 'sans-serif'],
      },
      fontSize: {
        headline: {
          large:[
            '0.5rem',
            {
              lineHeight: '1rem',
              fontWeight: '100',
            },
          ],
        }
      },
      colors: {
        white: '#ffffff',
        black: '#000000',
        light: {
          primary: '#1B6585',
          onPrimary: '#FFFFFF',
          error: '#BA1A1A',
          onError: '#FFFFFF',
          background: '#F6FAFE',
          onBackground: '#181C1F',
          surface: '#F6FAFE',
          onSurface: '#181C1F',
          onSurfaceVariant: '#41484D',
          outlineVariant: '#C0C7CD',
          shadow: '#000000',
          inverseSurface: '#2C3134',
          inverseOnSurface: '#EDF1F5',
          inversePrimary: '#8FCEF3',
          surfaceContainerLowest: '#FFFFFF',
          surfaceContainerLow: '#F0F4F8',
          surfaceContainer: '#EAEEF2',
          surfaceContainerHigh: '#E5E9ED',
          surfaceContainerHighest: '#DFE3E7',
        },
        dark: {
          primary: '#8FCEF3',
          onPrimary: '#003549',
          error: '#FFB4AB',
          onError: '#690005',
          background: '#0F1417',
          onBackground: '#DFE3E7',
          surface: '#0F1417',
          onSurface: '#DFE3E7',
          onSurfaceVariant: '#C0C7CD',
          outlineVariant: '#41484D',
          shadow: '#000000',
          inverseSurface: '#DFE3E7',
          inverseOnSurface: '#2C3134',
          inversePrimary: '#1B6585',
          surfaceContainerLowest: '#0A0F12',
          surfaceContainerLow: '#181C1F',
          surfaceContainer: '#1C2023',
          surfaceContainerHigh: '#262B2E',
          surfaceContainerHighest: '#313539',
        },
      },
    },
  },
  plugins: [],
};
