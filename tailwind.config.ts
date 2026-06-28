import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1B3A6B",
          deep: "#0F2647",
        },
        gold: {
          DEFAULT: "#C9A227",
          light: "#E8C96A",
        },
        offwhite: "#F7F8FA",
        ink: "#14213D",
        muted: "#5C6B7A",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(135deg, #0F2647 0%, #1B3A6B 60%, #1B3A6B 100%)",
        "gold-gradient": "linear-gradient(135deg, #E8C96A 0%, #C9A227 100%)",
      },
      boxShadow: {
        gold: "0 0 0 1px rgba(201,162,39,0.35), 0 8px 30px -8px rgba(201,162,39,0.45)",
        "navy-lg": "0 20px 60px -15px rgba(15,38,71,0.35)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(4deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(18px) rotate(-3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
