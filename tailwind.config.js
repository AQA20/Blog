/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/styles/**/*.css',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontSize: {
        'headline-l': [
          '2rem',
          {
            lineHeight: '2.875rem',
            fontWeight: '700',
          },
        ],
        'headline-m': [
          '1.75rem',
          {
            lineHeight: '2.625rem',
            fontWeight: '700',
          },
        ],
        'headline-s': [
          '1.5rem',
          {
            lineHeight: '2.375rem',
            fontWeight: '700',
          },
        ],
        'title-l': [
          '1.25rem',
          {
            lineHeight: '2rem',
            fontWeight: '700',
          },
        ],
        'title-m': [
          '1rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '700',
          },
        ],
        'title-s': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            fontWeight: '700',
          },
        ],
        'body-xl': [
          '1.125rem',
          {
            lineHeight: '2rem',
            fontWeight: '500',
          },
        ],
        'body-l': [
          '1rem',
          {
            lineHeight: '1.5rem',
            fontWeight: '400',
          },
        ],
        'body-m': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            fontWeight: '400',
          },
        ],
        'body-s': [
          '0.75rem',
          {
            lineHeight: '1rem',
            fontWeight: '400',
          },
        ],
        'label-l': [
          '0.875rem',
          {
            lineHeight: '1.25rem',
            fontWeight: '600',
          },
        ],
        'label-m': [
          '0.75rem',
          {
            lineHeight: '1rem',
            fontWeight: '600',
          },
        ],
      },
      colors: {
        white: '#ffffff',
        black: '#000000',
        primary: 'hsl(var(--primary))',
        onPrimary: 'hsl(var(--on-primary))',
        error: 'hsl(var(--error))',
        onError: 'hsl(var(--on-error))',
        primaryContainer: 'hsl(var(--primary-container))',
        surface: 'hsl(var(--surface))',
        surfaceContainer: 'hsl(var(--surface-container))',
        onSurface: 'hsl(var(--on-surface))',
        onSurfaceVariant: 'hsl(var(--on-surface-variant))',
        outlineVariant: 'hsl(var(--outline-variant))',
        shadow: 'hsl(var(--shadow))',
        inverseSurface: 'hsl(var(--inverse-surface))',
        inverseOnSurface: 'hsl(var(--inverse-on-surface))',
        inversePrimary: 'hsl(var(--inverse-primary))',
        surfaceContainerLowest: 'hsl(var(--surface-container-lowest))',
        surfaceContainerLow: 'hsl(var(--surface-container-low))',
        surfaceContainerHigh: 'hsl(var(--surface-container-high))',
        surfaceContainerHighest: 'hsl(var(--surface-container-highest))',
      },
    },
  },
  plugins: [],
};
