import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)'
        },
        amber: {
          50: '#FFF9E0',
          100: '#FFEEB1',
          200: '#FFE37E',
          300: '#FFD64B',
          400: '#FFCF0E',
          500: '#FFC600',
          600: '#FFB800',
          700: '#FFA400',
          800: '#FF9200',
          900: '#FF7000'
        },
        red: {
          50: '#FEDEF0',
          75: '#FFE5E8',
          100: '#FFD2D6',
          200: '#F1A2A0',
          300: '#E6877C',
          400: '#F3635B',
          500: '#F95943',
          600: '#EA4F41',
          700: '#D74538',
          800: '#CA3F34',
          900: '#BA3729'
        },
        purple: {
          10: '#FBF6FE',
          50: '#F4E6FD',
          100: '#E3C0FA',
          200: '#D195F8',
          300: '#BE69F6',
          400: '#AE4AF3',
          500: '#9D32E9',
          600: '#882AE3',
          700: '#7020DB',
          800: '#5721D3',
          900: '#0620C5'
        },
        blue: {
          50: '#DEF1FF',
          75: '#C2E8FF',
          100: '#A3E3FF',
          200: '#6ED1FF',
          300: '#00BFFF',
          400: '#009EFF',
          500: '#00A3FE',
          600: '#0095EF',
          700: '#0082DA',
          800: '#0071C6',
          900: '#0051A3'
        },
        teal: {
          50: '#D7F5F8',
          100: '#B5E7D6',
          200: '#44D8A4',
          300: '#00CC95',
          400: '#00B588',
          500: '#00A57A',
          600: '#009B68',
          700: '#007B58',
          800: '#007147',
          900: '#005931'
        },
        gray: {
          50: '#FDEDF0',
          75: '#FAFAFA',
          100: '#F8F6F8',
          200: '#F3F3F3',
          300: '#EEEEEE',
          350: '#E0E0E0',
          400: '#CECECE',
          500: '#B1B1B1',
          550: '#9C9C9C',
          600: '#868686',
          700: '#717171',
          800: '#515151',
          900: '#2F2F2F'
        }
      },
      zIndex: {
        background: '-10'
      }
    }
  },
  plugins: [
    animate,
    plugin(({ addUtilities }) => {
      addUtilities({
        '.bg-gradient-blur': {
          background: `
            radial-gradient(circle at 30% 30%, #fef6d4, transparent 50%), 
            radial-gradient(circle at 70% 40%, #ffe4e9, transparent 50%), 
            radial-gradient(circle at 50% 70%, #f3e8ff, transparent 50%), 
            radial-gradient(circle at 20% 90%, #e0f7ff, transparent 50%)
            `,
          filter: 'blur(80px)',
          transform: 'scale(1.2)'
        }
      });
    })
  ]
};
export default config;
