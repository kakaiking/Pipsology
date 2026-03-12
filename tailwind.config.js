/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/lib/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                display: ['var(--font-space-grotesk)', 'ui-sans-serif', 'sans-serif'],
                mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
            },
            colors: {
                brand: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
                surface: {
                    900: '#0a0f0d',
                    800: '#0d1411',
                    700: '#111a16',
                    600: '#162117',
                    500: '#1e2d24',
                    400: '#243529',
                    300: '#2e4436',
                    200: '#3d5c48',
                    100: '#4f7860',
                },
            },
            borderRadius: {
                '4xl': '2rem',
            },
            animation: {
                'pulse-green': 'pulse-green 2s ease-in-out infinite',
                flicker: 'flicker 1.5s ease-in-out infinite',
            },
            keyframes: {
                'pulse-green': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                flicker: {
                    '0%, 100%': { transform: 'scale(1) rotate(-2deg)' },
                    '50%': { transform: 'scale(1.1) rotate(2deg)' },
                },
            },
        },
    },
    plugins: [],
};
