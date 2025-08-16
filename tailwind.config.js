
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(220 100% 50%)',
        accent: 'hsl(170 80% 45%)',
        bg: 'hsl(220 30% 10%)',
        surface: 'hsl(220 30% 15%)',
        text: 'hsl(0 0% 95%)',
        muted: 'hsl(0 0% 70%)',
      },
      spacing: {
        sm: '6px',
        md: '12px',
        lg: '24px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(220, 30%, 15%, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
      },
    },
  },
  plugins: [],
}
