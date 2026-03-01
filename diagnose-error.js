const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

const diagnose = async () => {
    const model = 'meta-llama/llama-3.3-70b-instruct:free';
    console.log(`Diagnosing with model: ${model}...`);
    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: model,
                messages: [
                    { role: 'user', content: 'Test' }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:test',
                    'X-Title': 'Diagnosis Script'
                }
            }
        );
        console.log("SUCCESS!");
        fs.writeFileSync('error.log', 'SUCCESS: API Key and Model are working.\n' + JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("FAILED!");
        let errorLog = `Error Message: ${error.message}\n`;
        if (error.response) {
            errorLog += `Status: ${error.response.status}\n`;
            errorLog += `Data: ${JSON.stringify(error.response.data, null, 2)}\n`;
            errorLog += `Headers: ${JSON.stringify(error.response.headers, null, 2)}\n`;
        }
        fs.writeFileSync('error.log', errorLog);
        console.log("Error details written to error.log");
    }
};

diagnose();
