import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import animate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/**/*.{js,ts,jsx,tsx,mdx}',
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
        kakao: '#FEE500',
        amber: {
          '50': '#FFF9E0',
          '100': '#FFEEB1',
          '200': '#FFE37E',
          '300': '#FFD946',
          '400': '#FFCF0E',
          '500': '#FFC600',
          '600': '#FFB800',
          '700': '#FFA400',
          '800': '#FF9200',
          '900': '#FF7000'
        },
        red: {
          '50': '#FFEDEF',
          '75': '#FFE0E4',
          '100': '#FFD2D6',
          '200': '#FCA49C',
          '300': '#FA7B6A',
          '400': '#F66355',
          '500': '#F95943',
          '600': '#EA4F41',
          '700': '#D7453B',
          '800': '#CA3F34',
          '900': '#BA3729'
        },
        purple: {
          '10': '#FBF6FE',
          '50': '#F4E6FD',
          '100': '#E3C0FA',
          '200': '#D195F8',
          '300': '#BE69F6',
          '400': '#AE44F3',
          '500': '#9D23E9',
          '600': '#8B23E3',
          '700': '#7022DB',
          '800': '#5721D3',
          '900': '#0620C5'
        },
        blue: {
          '50': '#DEF4FF',
          '75': '#C2EBFF',
          '100': '#ABE3FF',
          '200': '#6ED1FF',
          '300': '#00BFFF',
          '400': '#00B2FF',
          '500': '#00A3FE',
          '600': '#0095EF',
          '700': '#0082DA',
          '800': '#0071C6',
          '900': '#0051A3'
        },
        teal: {
          '50': '#D7F6EF',
          '100': '#9BE7D6',
          '200': '#44D8BA',
          '300': '#00C59F',
          '400': '#00B58B',
          '500': '#00A578',
          '600': '#00986B',
          '700': '#00875B',
          '800': '#00774D',
          '900': '#005931'
        },
        gray: {
          '50': '#FDFDFD',
          '75': '#FAFAFA',
          '100': '#F8F8F8',
          '200': '#F3F3F3',
          '300': '#EEEEEE',
          '350': '#E0E0E0',
          '400': '#CECECE',
          '500': '#B1B1B1',
          '550': '#9C9C9C',
          '600': '#868686',
          '700': '#717171',
          '800': '#515151',
          '900': '#2F2F2F'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      zIndex: {
        background: '-10'
      },
      backgroundImage: {
        'info-icon': "url('/icons/information_line.svg')",
        'right-line-gray-400-icon': "url('/icons/right-line-gray-400.svg')",
        'right-line-gray-600-icon': "url('/icons/right-line-gray-600.svg')",
        'right-line-gray-800-icon': "url('/icons/right-line-gray-800.svg')",
        'down-line-gray-400-icon': "url('/icons/down-line-gray-400.svg')",
        'down-line-gray-600-icon': "url('/icons/down-line-gray-600.svg')",
        'down-line-gray-800-icon': "url('/icons/down-line-gray-800.svg')",
        'sparkle-illustration': "url('/illustrations/cta-banner-sparkle.svg')",
        'image-upload-illustration': "url('/illustrations/image-upload.svg')",
        'ai-sparkle-1': "url('/illustrations/ai-sparkle-1.svg')",
        'ai-sparkle-2': "url('/illustrations/ai-sparkle-2.svg')",
        'delete-2-line-icon': 'url(/icons/delete_2_line.svg)',
        'close-line-icon': 'url(/icons/close_line.svg)',
        'meal-category-breakfast': "url('/illustrations/meal-category-breakfast.svg')",
        'meal-category-lunch': "url('/illustrations/meal-category-lunch.svg')",
        'meal-category-dinner': "url('/illustrations/meal-category-dinner.svg')",
        'meal-category-snack': "url('/illustrations/meal-category-snack.svg')",
        'home-fill-icon': 'url(/icons/home_fill.svg)',
        'home-line-icon': 'url(/icons/home_line.svg)',
        'analyze-fill-icon': 'url(/icons/analyze_fill.svg)',
        'analyze-line-icon': 'url(/icons/analyze_line.svg)',
        'chart-fill-icon': 'url(/icons/chart_fill.svg)',
        'chart-line-icon': 'url(/icons/chart_line.svg)',
        'edit-info-icon': "url('/icons/edit-line.svg')",
        'add-info-icon': "url('/icons/add-line-white.svg')",
        'close-line-gray-550-icon': "url('/icons/close-line-gray-550.svg')",
        'kakao-logo': 'url(/kakao-logo.svg)',
        'google-logo': 'url(/google-logo.svg)',
        'complete-confetti': 'url(/illustrations/complete-confetti.svg)'
      },
      letterSpacing: {
        snug: '-0.0175rem'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [
    animate,
    plugin(({ addUtilities }) => {
      addUtilities({
        '.bg-gradient-main': {
          background: `
            radial-gradient(119.13% 34.32% at 50.13% 50.79%, 
            rgba(255, 249, 224, 0.7) 0%, 
            rgba(255, 237, 239, 0.7) 35.58%, 
            rgba(251, 246, 254, 0.7) 100%),
            #FDFDFD
          `
        },
        '.bg-gradient-radial-purple': {
          background: `radial-gradient(72.84% 72.84% at 50% 27.16%, rgba(255, 210, 214, 0.20) 0%, rgba(227, 192, 250, 0.20) 100%), #fff`
        },
        '.bg-button-gradient': {
          background: `linear-gradient(149deg, rgba(255, 210, 214, 0.32) 4.14%, rgba(209, 149, 248, 0.32) 109.45%), #FFF`
        },
        '.bg-gradient-linear-progress': {
          background: `linear-gradient(90deg, #FFF5CC 0%, #FFE5E8 35.58%, #F4E6FD 100%)`
        },
        '.typography-title1': {
          fontSize: '2.25rem',
          lineHeight: '122%',
          fontWeight: '700',
          letterSpacing: '-0.02em'
        },
        '.typography-title2': {
          fontSize: '1.25rem',
          lineHeight: '136%',
          fontWeight: '650',
          letterSpacing: '-0.02em'
        },
        '.typography-subTitle1': {
          fontSize: '1.125rem',
          lineHeight: '140%',
          fontWeight: '600',
          letterSpacing: '-0.02em'
        },
        '.typography-subTitle2': {
          fontSize: '1rem',
          lineHeight: '140%',
          fontWeight: '600',
          letterSpacing: '-0.02em'
        },
        '.typography-subTitle3': {
          fontSize: '0.9375rem',
          lineHeight: '140%',
          fontWeight: '600',
          letterSpacing: '-0.02em'
        },
        '.typography-subTitle4': {
          fontSize: '0.875rem',
          lineHeight: '140%',
          fontWeight: '600',
          letterSpacing: '-0.02em'
        },
        '.typography-subTitle5': {
          fontSize: '0.8125rem',
          lineHeight: '140%',
          fontWeight: '600',
          letterSpacing: '-0.02em'
        },
        '.typography-body1': {
          fontSize: '1rem',
          lineHeight: '140%',
          fontWeight: '450',
          letterSpacing: '-0.02em'
        },
        '.typography-body2': {
          fontSize: '0.9375rem',
          lineHeight: '140%',
          fontWeight: '450',
          letterSpacing: '-0.02em'
        },
        '.typography-body3': {
          fontSize: '0.875rem',
          lineHeight: '140%',
          fontWeight: '450',
          letterSpacing: '-0.02em'
        },
        '.typography-body4': {
          fontSize: '0.8125rem',
          lineHeight: '140%',
          fontWeight: '450',
          letterSpacing: '-0.01em'
        },
        '.typography-caption1': {
          fontSize: '0.8125rem',
          lineHeight: '140%',
          fontWeight: '500',
          letterSpacing: '-0.02em'
        },
        '.typography-caption2': {
          fontSize: '0.75rem',
          lineHeight: '140%',
          fontWeight: '500',
          letterSpacing: '-0.01em'
        },
        '.typography-caption3': {
          fontSize: '0.75rem',
          lineHeight: '140%',
          fontWeight: '650',
          letterSpacing: '-0.02em'
        }
      });
    })
  ]
};
export default config;
