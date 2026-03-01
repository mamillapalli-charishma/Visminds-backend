const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.OPENROUTER_API_KEY;

if (!API_KEY) {
    console.error("No API KEY found in .env");
    process.exit(1);
}

const testModel = async (modelName) => {
    console.log(`Testing model: ${modelName}...`);
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: modelName,
                messages: [
                    { role: 'user', content: 'Say hello' }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:test',
                    'X-Title': 'Test Script'
                }
            }
        );
        console.log(`SUCCESS: ${modelName}`);
        console.log("Response:", response.data.choices[0].message.content);
        return true;
    } catch (error) {
        console.error(`FAILED: ${modelName}`);
        if (error.response) {
            console.error("Error Status:", error.response.status);
            console.error("Error Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Error Message:", error.message);
        }
        return false;
    }
};

const runTests = async () => {
    // Try a few models to see which one works
    const models = [
        'openrouter/auto',
        'google/gemini-2.0-flash-lite-preview-02-05:free',
        'google/gemini-2.0-flash-exp:free',
        'mistralai/mistral-7b-instruct:free',
        'meta-llama/llama-3-8b-instruct:free'
    ];

    for (const model of models) {
        await testModel(model);
        // if (success) break; // Check all models
    }
};

runTests();
