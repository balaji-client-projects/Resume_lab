const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');

// Load .env.local manually since we aren't in Next.js
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const match = envContent.match(/GEMINI_API_KEY=(.*)/);
const apiKey = match ? match[1].trim() : null;

console.log("Testing Gemini API...");
console.log("API Key found:", apiKey ? "Yes (Starts with " + apiKey.substring(0, 5) + ")" : "No");

if (!apiKey) {
    console.error("❌ No API Key found in .env.local");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        console.log("Fetching available models...");
        // Use the API directly via fetch to list models if SDK helper isn't clear
        // But SDK has genAI.getGenerativeModel... no, it doesn't expose listModels directly on the main class easily in all versions.
        // Let's use simple fetch for listing which is reliable.

        const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.models) {
            console.log("✅ Available Models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(` - ${m.name} (${m.displayName})`);
                }
            });
        } else {
            console.log("❌ No models found in response:", data);
        }

    } catch (error) {
        console.error("❌ List Models Failed:", error.message);
    }
}

listModels();
