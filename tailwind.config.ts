import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        leaf: {
          50: "#E8F5E9",
          100: "#C8E6C9",
          200: "#A5D6A7",
          300: "#81C784",
          400: "#66BB6A",
          500: "#2D6A4F",
          600: "#245A42",
          700: "#1B4332",
          800: "#143328",
          900: "#0D221B",
        },
        sage: {
          50: "#E0F2E9",
          100: "#B8E0CC",
          200: "#8ECFAD",
          300: "#6BC194",
          400: "#52B788",
          500: "#40A07A",
          600: "#358A6A",
          700: "#2A7459",
          800: "#1F5E48",
          900: "#144837",
        },
        earth: {
          50: "#FFF8E1",
          100: "#FFECB3",
          200: "#FFE082",
          300: "#FFD54F",
          400: "#D4A373",
          500: "#BC8A5F",
          600: "#A47148",
          700: "#8B5E34",
          800: "#724B22",
          900: "#593812",
        },
        sand: {
          50: "#FEFDF5",
          100: "#FEFAE0",
          200: "#FDF6CC",
          300: "#FCF2B8",
          400: "#FAEEA3",
          500: "#F9EA8F",
        },
        charcoal: {
          50: "#EAEBEF",
          100: "#C4C5D1",
          200: "#9D9FB3",
          300: "#767895",
          400: "#4F5277",
          500: "#2B2D42",
          600: "#232538",
          700: "#1B1D2E",
          800: "#131524",
          900: "#0B0D1A",
        },
        mist: {
          50: "#FAFCFA",
          100: "#F0F4F0",
          200: "#E6ECE6",
          300: "#DCE3DC",
          400: "#D2DAD2",
          500: "#C8D1C8",
        },
        carbon: {
          dark: "#0F1A14",
          card: "#1A2E23",
          surface: "#213D2F",
          text: "#E8F0E8",
          muted: "#9CB5A0",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-soft": "bounceSoft 0.6s ease-out",
        "spin-slow": "spin 3s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(45, 106, 79, 0.15)",
        "glow-lg": "0 0 40px rgba(45, 106, 79, 0.2)",
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover":
          "0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)",
        "card-dark": "0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)",
      },
      backgroundImage: {
        "gradient-natural":
          "linear-gradient(135deg, #2D6A4F 0%, #52B788 50%, #D4A373 100%)",
        "gradient-forest":
          "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
        "gradient-sage":
          "linear-gradient(135deg, #52B788 0%, #81C784 100%)",
        "gradient-warm":
          "linear-gradient(135deg, #D4A373 0%, #FEFAE0 100%)",
        "gradient-dark":
          "linear-gradient(135deg, #0F1A14 0%, #1A2E23 50%, #213D2F 100%)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
