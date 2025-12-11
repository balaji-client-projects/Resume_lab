import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "rgb(var(--border) / <alpha-value>)",
                input: "rgb(var(--input) / <alpha-value>)",
                ring: "rgb(var(--ring) / <alpha-value>)",
                background: "rgb(var(--background) / <alpha-value>)",
                foreground: "rgb(var(--foreground) / <alpha-value>)",
                primary: {
                    DEFAULT: "rgb(var(--primary) / <alpha-value>)",
                    foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
                    light: "rgb(var(--primary-light) / <alpha-value>)",
                    dark: "rgb(var(--primary-dark) / <alpha-value>)",
                    glow: "rgba(59, 130, 246, 0.5)"
                },
                secondary: {
                    DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
                    foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
                    glow: "rgba(6, 182, 212, 0.5)"
                },
                destructive: {
                    DEFAULT: "rgb(var(--status-blocked) / <alpha-value>)",
                    foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
                },
                muted: {
                    DEFAULT: "rgb(var(--muted) / <alpha-value>)",
                    foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
                },
                accent: {
                    DEFAULT: "rgb(var(--accent) / <alpha-value>)",
                    foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
                },
                popover: {
                    DEFAULT: "rgb(var(--popover) / <alpha-value>)",
                    foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
                },
                card: {
                    DEFAULT: "rgb(var(--card) / <alpha-value>)",
                    foreground: "rgb(var(--card-foreground) / <alpha-value>)",
                },
                status: {
                    success: "rgb(var(--status-success) / <alpha-value>)",
                    pending: "rgb(var(--status-pending) / <alpha-value>)",
                    progress: "rgb(var(--status-progress) / <alpha-value>)",
                    blocked: "rgb(var(--status-blocked) / <alpha-value>)",
                    cancelled: "rgb(var(--status-cancelled) / <alpha-value>)",
                },
                // Backward compatibility
                dark: {
                    bg: "rgb(var(--background) / <alpha-value>)",
                    card: "rgb(var(--card) / <alpha-value>)",
                    border: "rgb(var(--border) / <alpha-value>)",
                }
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out",
                "fade-in-up": "fadeInUp 0.5s ease-out",
                "pulse-glow": "pulseGlow 2s infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                pulseGlow: {
                    "0%, 100%": { boxShadow: "0 0 10px rgba(59, 130, 246, 0.1)" },
                    "50%": { boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)" },
                }
            },
        },
    },
    plugins: [],
};
export default config;
