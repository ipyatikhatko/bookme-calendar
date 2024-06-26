import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        divider: '#E5E6EB',
        priamry: {
          blue: {
            500: '#007AFF'
          }
        },
        secondary: {
          bg: '#F0F1F3'
        },
        btn: {
          secondary: {
            bg: '#222222',
            content: '#FFFFFF'
          },
          teritary: {
            bg: '#FFFFFF',
            content: '#222222',
            border: '#E5E6EB'
          },
        },
      }
    },
  },
  plugins: [],
};
export default config;
