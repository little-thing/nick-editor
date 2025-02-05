import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: ['media', '(prefers-color-scheme: dark)', 'class'],
  content: ['./src/**/*.{ts,tsx}'],
  safelist: ['ProseMirror'],
  theme: {
    extend: {
      animation: {
        'fade-out': 'fade-out 0.5s linear',
      },
      keyframes: {
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      opacity: {
        4: '0.04',
        8: '0.08',
        16: '0.16',
        48: '0.48',
        64: '0.64',
      },
      boxShadow: {
        mini: '0 2px 4px rgba(0, 0, 0, 0.06)',
        small: '0 2px 16px rgba(0, 0, 0, 0.06)',
        medium: '0px 4px 24px 0px rgba(0, 0, 0, 0.06)',
        large: '0 4px 20px rgba(0, 0, 0, 0.12)',
        custom: '0 4px 40px rgba(74, 94, 85, 0.06)',
        frame: '0px 0px 0px 2px rgba(5, 185, 116, 0.16)',
      },
      spacing: {
        0.75: '3px',
        1.25: '5px',
        7.5: '30px',
      },
      colors: {
        mainColor: '#25BF84',
        'green-1': '#F0FFF7',
        'green-2': '#C9F2DD',
        'green-3': '#9AE6C1',
        'green-4': '#6FD9A9',
        'green-5': '#47CC95',
        'green-6': '#25BF84',
        'green-7': '#15996B',
        'green-8': '#0A7352',
        'green-9': '#034D38',
        'green-10': '#01261D',

        'purple-2': '#998DD9',
        'rose-2': '#F075A9',

        'yellow-1': '#FBF4D7',
        'yellow-2': '#F7BA1E',

        'red-1': '#FBE0E0',
        'red-2': '#E15564',
        'red-3': '#E03B3B',

        'blue-1': '#E0EDFF',
        'blue-2': '#4C9AFF',

        'orange-1': '#FFDECC',
        'orange-2': '#FB8F74',
        'ice-1': '#D8F3FC',
        'ice-2': '#25C7E0',

        'gray-1': '#fff',
        'gray-2': '#fafafa',
        'gray-3': '#f5f5f5',
        'gray-4': '#f0f0f0',
        'gray-5': '#d9d9d9',
        'gray-6': '#bfbfbf',
        'gray-7': '#8c8c8c',
        'gray-8': '#595959',
        'gray-9': '#434343',
        'gray-10': '#262626',
        'gray-11': '#1f1f1f',
        'gray-12': '#141414',
        'gray-13': '#000000',
        'gray-14': '#313131',
        //dark
        'green-dark': '#25BF84',
        'ice-dark': '#67D0F1',
        'blue-dark': '#639BF3',
        'purple-dark': '#B992EB',
        'rose-dark': '#F572A9',
        'red-dark': '#FC6A6A',
        'orange-dark': '#F88C5E',
        'yellow-dark': '#F6B30D',
        'gray-dark': '#1F1F1F',
        //light
        'green-light': '#C9F2DD',
        'ice-light': '#D8F3FC',
        'blue-light': '#E0EDFF',
        'purple-light': '#EDDFFF',
        'rose-light': '#FFE0F3',
        'red-light': '#FFE4E4',
        'orange-light': '#FFDECC',
        'yellow-light': '#FBF4D7',
        'gray-light': '#F0F0F0',

        'brand-light-1': '#E8FFF2',
        'brand-light-6': '#05B974',

        error: '#F04F58',
        warning: '#F6B30D',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hover'],
      fontWeight: ['hover'],
      display: ['group-hover'],
    },
  },

  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwindcss-scoped-groups')({
      groups: ['one', 'two'],
    }),

    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.grid-rows-8': {
          'grid-template-rows': ' repeat(8, minmax(0, 1fr))',
        },
      };
      addUtilities(newUtilities);
    }),

    // require('tailwindcss-scoped-groups'),
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.max-w-50': {
          maxWidth: '12.5rem',
        },
        '.z-10000': {
          'z-index': '10000',
        },
        '.flex-2': {
          flex: '2',
        },
        '.w-120': {
          width: '30rem',
        },
        '.w-150': {
          width: '600px',
        },
        '.w-fit': {
          width: 'fit-content',
        },
        '.h-21': {
          height: '5.25rem',
        },
        '.ml-68': {
          marginLeft: '17rem',
        },
        '.min-h-8': {
          'min-height': '32px',
        },
        '.truncate-2': {
          display: ' -webkit-box',
          '-webkit-line-clamp': ' 2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
        },
        '.truncate-4': {
          display: ' -webkit-box',
          '-webkit-line-clamp': '4',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
        },
        '.no-scrollbar': {
          'scrollbar-width': '0',
          'scrollbar-color': 'gray transparent',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          width: '0',
          height: '0',
        },
      };
      addUtilities(newUtilities);
    }),
    plugin(({ addComponents, theme }) => {
      const classs = {
        '.dropdown-trigger': {
          position: 'relative',
          'border-radius': '4px',
          cursor: 'pointer',
          border: '1px solid ',
          'border-color': theme('colors.gray-5')!,
          'padding-left': '4px',
          'padding-right': '4px',
          display: 'flex',
          'align-items': 'center',
          '&:not(.disabled)&::after': {
            content: '""',
            width: '0',
            height: '0',
            'border-top': `5px solid ${theme('colors.gray-6')}`,
            'border-left': '4px solid transparent',
            'border-right': '4px solid transparent',
            position: 'absolute',
            top: 'calc(50% - 1px)',
            left: 'unset',
            right: '6px',
          },
          '&:not(.disabled)&::before': {
            content: '""',
            width: '20px',
            height: '100%',
            position: 'absolute',
            'background-color': 'white',
            'border-radius': '0 4px 4px 0',
            top: '0',
            right: '0',
          },
        },

        '.dropdown-overlay': {
          backgroundColor: '#fff',
          'border-radius': '4px',
          'box-shadow': '0 4px 24px rgba(0, 0, 0, 0.12)',
        },
        '.keep-all': {
          'word-break': 'keep-all',
        },
        '.dropdown-item': {
          cursor: 'pointer',
          display: 'flex',
          'align-items': 'center',
          height: theme('height.8')!,
          '&:hover': {
            backgroundColor: theme('colors.gray-3')!,
          },
        },
        '.divider': {
          backgroundColor: '#F0F0F0',
          height: '1px',
        },
        '.hover-switch': {
          width: '100%',
          '&:hover': {
            '.hover-clildren': {
              display: 'flex !important',
            },
          },
        },
      };
      addComponents(classs);
    }),

    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
  corePlugins: {
    preflight: false,
  },
};
