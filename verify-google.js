const axios = require('axios');
require('dotenv').config();

const models = [
    'google/gemma-3-27b-it:free',
    'google/gemini-2.0-flash-lite-preview-02-05:free'
];

const verify = async () => {
    for (const model of models) {
        console.log(`Testing ${model}...`);
        try {
            const res = await axios.post(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    model: model,
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant.' },
                        { role: 'user', content: 'Hello' }
                    ]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                        'HTTP-Referer': 'http://localhost:5173',
                        'X-Title': 'VisMinds'
                    }
                }
            );
            console.log(`PASS: ${model}`);
            console.log(res.data.choices[0].message.content.substring(0, 50));
        } catch (e) {
            console.error(`FAIL: ${model}`);
            if (e.response) {
                console.error(`Status: ${e.response.status}`);
                console.error(JSON.stringify(e.response.data));
            } else {
                console.error(e.message);
            }
        }
    }
};

verify();
