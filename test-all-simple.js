const axios = require('axios');
require('dotenv').config();

const modelsToTest = [
    'google/gemini-2.0-flash-lite-preview-02-05:free',
    'google/gemini-2.0-flash-exp:free',
    'mistralai/mistral-small-3.1-24b-instruct:free',
    'meta-llama/llama-3.1-405b-instruct:free',
    'qwen/qwen-2.5-vl-7b-instruct:free',
    'openrouter/auto'
];

const test = async () => {
    console.log("Testing models availability...");
    for (const model of modelsToTest) {
        try {
            process.stdout.write(`Testing ${model}... `);
            await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    model: model,
                    messages: [{ role: 'user', content: 'hi' }]
                },
                {
                    headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}` }
                }
            );
            console.log("PASS");
        } catch (e) {
            console.log(`FAIL (${e.response ? e.response.status : e.message})`);
        }
    }
};

test();
