const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const listModels = async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    try {
        const response = await axios.get(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );
        const modelNames = response.data.models.map(m => m.name).join('\n');
        fs.writeFileSync('available_models.txt', modelNames);
        console.log("Model names written to available_models.txt");
    } catch (error) {
        console.error("FAILED to list models:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    }
};

listModels();
