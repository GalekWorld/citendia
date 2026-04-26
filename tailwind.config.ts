import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        canvas: "#f8fafc",
        accent: {
          DEFAULT: "#2563eb",
          foreground: "#eff6ff"
        },
        accentDark: "#1d4ed8",
        primary: "#0f172a",
        primaryLight: "#1e293b",
        secondary: "#64748b",
        tertiary: "#94a3b8",
        borderBrand: "#e2e8f0",
        slateBrand: "#cbd5e1",
        highlight: "#f59e0b",
        highlightDark: "#d97706",
        surface: "#ffffff",
        surfaceSubtle: "#f1f5f9",
        error: "#ef4444",
        success: "#10b981"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        panel: "0 25px 50px -12px rgba(0, 0, 0, 0.12)",
        soft: "0 10px 40px -10px rgba(14, 165, 165, 0.25)",
        glow: "0 0 60px -15px rgba(14, 165, 165, 0.4)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        cardHover: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      },
      backgroundImage: {
        "hero-pattern":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(14, 165, 165, 0.15), transparent), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(245, 158, 11, 0.1), transparent)",
        "mesh-light":
          "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
        "gradient-radial": "radial-gradient(var(--gradient-shape))",
        "gradient-primary":
          "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        "gradient-accent":
          "linear-gradient(135deg, #0ea5a1 0%, #14b8a6 100%)",
        "glass":
          "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)"
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem"
      }
    }
  },
  plugins: []
};

export default config;