const axios = require('axios');
require('dotenv').config();

const testModel = async () => {
    const model = 'meta-llama/llama-3.3-70b-instruct:free';
    console.log(`Testing primary model: ${model}...`);
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: model,
                messages: [
                    { role: 'system', content: 'You are an expert digital marketer.' },
                    { role: 'user', content: 'Write a tagline for a coffee brand.' }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:test',
                    'X-Title': 'Test Script'
                }
            }
        );
        console.log("SUCCESS!");
        console.log("Response:", response.data.choices[0].message.content);
    } catch (error) {
        console.error("FAILED:", error.response ? error.response.data : error.message);
    }
};

testModel();
