const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const MODEL = 'gemini-2.5-flash';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

const generateContent = async (req, res) => {
    const { prompt, systemRole, preferences } = req.body;

    try {
        let finalPrompt = "";

        if (preferences) {
            finalPrompt = `
            Task: Generate a ${preferences.contentType}
            Topic: ${preferences.topic}
            Target Audience: ${preferences.audience}
            Platform: ${preferences.platform}
            Number of items: ${preferences.count || 5}
            
            Format the response strictly as a JSON array of objects.
            Each object should match the specified contentType structure.
            For 'Strategy Table', include fields: "date", "platform", "topic", "status".
            For 'Todo List', include fields: "task", "priority", "status".
            `;
        } else {
            finalPrompt = systemRole ? `${systemRole}\n\n${prompt}` : prompt;
        }

        const response = await axios.post(
            `${BASE_URL}/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: finalPrompt }]
                }]
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
        res.json({ result });

    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate content" });
    }
};

const generateCouncilDiscussion = async (req, res) => {
    const { topic, personas } = req.body;

    const systemPrompt = `
    You are simulating a discussion between a council of advisors.
    Topic: "${topic}"
    Council Members: ${personas.join(', ')}
    
    Generate a conversation script where each member speaks their mind on the topic.
    Format the output strictly as a JSON array of objects.
    Each object must have:
    - "speaker": Name of the persona
    - "content": What they say
    - "sentiment": "positive", "neutral", or "negative"
    `;

    try {
        const response = await axios.post(
            `${BASE_URL}/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                contents: [{
                    parts: [{ text: systemPrompt }]
                }],
                generationConfig: {
                    response_mime_type: "application/json"
                }
            },
            { headers: { 'Content-Type': 'application/json' } }
        );

        let text = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) throw new Error("No content generated");

        // Clean up markdown if present (though response_mime_type should prevent it)
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const discussion = JSON.parse(text);
        res.json({ result: discussion });

    } catch (error) {
        console.error("Gemini Council Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to generate council discussion" });
    }
};

module.exports = { generateContent, generateCouncilDiscussion };