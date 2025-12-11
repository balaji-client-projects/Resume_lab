// Custom Clerk theme configuration
// Import this in any component that uses Clerk components

export const clerkTheme = {
    baseTheme: undefined,
    variables: {
        colorPrimary: "#6366f1", // Indigo
        colorSuccess: "#22c55e", // Green
        colorDanger: "#ef4444", // Red
        colorWarning: "#eab308", // Yellow
        colorBackground: "#0F1117", // Dark background
        colorInputBackground: "#000000", // Black input
        colorInputText: "#ffffff", // White text
        colorText: "#ffffff", // White text
        colorTextSecondary: "#94a3b8", // Slate gray
        colorTextOnPrimaryBackground: "#ffffff",
        colorNeutral: "#64748b",
        borderRadius: "0.75rem", // Rounded-xl
        fontFamily: "Inter, sans-serif",
        fontSize: "0.875rem", // text-sm
        fontWeight: {
            normal: "400",
            medium: "500",
            semibold: "600",
            bold: "700",
        },
    },
    elements: {
        // Card wrapper
        card: "bg-[#0F1117] border border-white/10 shadow-2xl backdrop-blur-xl",

        // Header
        headerTitle: "text-white font-bold text-xl",
        headerSubtitle: "text-slate-400 text-sm",

        // Buttons
        formButtonPrimary:
            "bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-[1.02]",

        // Social login buttons
        socialButtonsBlockButton:
            "border border-white/10 hover:bg-white/5 text-white transition-colors rounded-xl",
        socialButtonsBlockButtonText: "text-white font-medium",

        // Form inputs
        formFieldInput:
            "bg-black/40 border-white/10 text-white placeholder:text-slate-600 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50",
        formFieldLabel: "text-slate-300 font-medium",
        formFieldInputShowPasswordButton: "text-slate-400 hover:text-white",

        // Links
        footerActionLink: "text-indigo-400 hover:text-indigo-300 font-medium",

        // Divider
        dividerLine: "bg-white/10",
        dividerText: "text-slate-500 text-xs uppercase tracking-wider",

        // Alert
        alert: "border-indigo-500/20 bg-indigo-500/10",
        alertText: "text-indigo-300",

        // Error
        formFieldError: "text-red-400 text-xs mt-1",
        formFieldErrorText: "text-red-400",

        // Loading
        spinner: "border-indigo-500",

        // Badges
        badge: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",

        // Footer
        footer: "hidden", // Hide default Clerk branding
        footerAction: "flex flex-col gap-3",
        footerActionText: "text-slate-400 text-sm",

        // Profile page (if using UserProfile component)
        navbar: "bg-white/5 border-white/5",
        navbarButton: "text-slate-400 hover:text-white hover:bg-white/5",
        navbarButtonActive: "bg-indigo-600 text-white",

        // Form
        form: "space-y-4",
        formField: "space-y-2",

        // OTP input (for 2FA)
        otpCodeFieldInput: "bg-black/40 border-white/10 text-white text-center rounded-xl",

        // Identity preview (for email verification)
        identityPreview: "bg-white/5 border border-white/10 rounded-xl p-4",
        identityPreviewText: "text-white",
        identityPreviewEditButton: "text-indigo-400 hover:text-indigo-300",
    },
};
