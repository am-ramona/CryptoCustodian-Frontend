import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-ibm-plex-sans)'],
        mono: ['var(--font-ibm-plex-mono)'],
      },
      colors: {  
        grey: {  
          dark: '#6B6B6B',  
          mid: '#bdbdbd', 
          light: '#d9d9d9'
        },   
        blackLight: '#232323',
        offWhite: '#eeeded',
        green: '#54B9A1',  
        orange: '#F0B065',
        red: '#DF5C64'
      },  
      spacing: {
        '18': '1.125rem',
        '60': '3.75rem'
      }

    },
  },
  plugins: [],
};
export default config;
