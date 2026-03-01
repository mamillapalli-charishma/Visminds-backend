const axios = require('axios');
require('dotenv').config();

const debugGemini = async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    const baseUrl = 'https://generativelanguage.googleapis.com/v1beta';

    console.log("--- DEBUG START ---");
    console.log("API Key found:", apiKey ? "Yes (length: " + apiKey.length + ")" : "No");

    // 1. List Models
    console.log("\nStep 1: Listing models...");
    try {
        const listResponse = await axios.get(`${baseUrl}/models?key=${apiKey}`);
        console.log("SUCCESS: Models listed.");
        const models = listResponse.data.models || [];
        console.log("Found " + models.length + " models.");
        models.forEach(m => {
            if (m.name.includes('gemini-1.5-flash')) {
                console.log(`- MATCH: ${m.name}`);
            }
        });

        if (models.length > 0) {
            const firstModel = models[0].name;
            console.log(`\nStep 2: Testing first available model: ${firstModel}`);
            const testResponse = await axios.post(
                `${baseUrl}/${firstModel}:generateContent?key=${apiKey}`,
                { contents: [{ parts: [{ text: "Hi" }] }] }
            );
            console.log("GENERATE SUCCESS with " + firstModel);
            console.log("Result:", testResponse.data.candidates?.[0]?.content?.parts?.[0]?.text);
        }

    } catch (error) {
        console.error("DEBUG FAILED:");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Message:", error.message);
        }
    }
};

debugGemini();
