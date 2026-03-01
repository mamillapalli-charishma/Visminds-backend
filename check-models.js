const axios = require('axios');
require('dotenv').config();
const fs = require('fs');

const listModels = async () => {
    try {
        console.log("Fetching models...");
        const response = await axios.get('https://openrouter.ai/api/v1/models', {
            headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}` }
        });

        const models = response.data.data;
        console.log(`Total models: ${models.length}`);

        const freeModels = models.filter(m => m.id.includes('free'));
        const content = freeModels.map(m => m.id).join('\n');
        fs.writeFileSync('models.txt', content);
        console.log("Written to models.txt");

    } catch (error) {
        console.error("Error:", error.message);
    }
};

listModels();
