const axios = require('axios');
require('dotenv').config();

const listModels = async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Listing available models...");
    try {
        const response = await axios.get(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );
        console.log("Available Models:");
        response.data.models.forEach(m => console.log(`- ${m.name} (${m.displayName})`));
    } catch (error) {
        console.error("FAILED to list models:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    }
};

listModels();
