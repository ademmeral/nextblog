import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      margin : {
        'center' : '0 auto'
      },
      maxWidth : {
        'wrapper' : 'calc(1280px + 1rem)'
      },
      gridTemplateRows : {
        'layout' : 'max-content 1fr max-content'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
