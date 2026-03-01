const axios = require('axios');
require('dotenv').config();

const testGemini = async () => {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = 'gemini-2.5-flash';
    console.log(`Testing Gemini API directly with model: ${model}...`);
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
            {
                contents: [{
                    parts: [{ text: 'Write a tagline for a coffee brand.' }]
                }]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("SUCCESS!");
        console.log("Response:", response.data.candidates[0].content.parts[0].text);
    } catch (error) {
        console.error("FAILED:", error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
    }
};

testGemini();
