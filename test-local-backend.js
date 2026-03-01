const axios = require('axios');

const testLocalEndpoints = async () => {
    const baseUrl = 'http://localhost:5000/api/ai';

    console.log("--- LOCAL BACKEND TEST START ---");

    // 1. Test /generate (Simple)
    console.log("\nTesting /generate (Simple)...");
    try {
        const res = await axios.post(`${baseUrl}/generate`, {
            prompt: "Tell me a joke.",
            systemRole: "You are a standup comedian."
        });
        console.log("SUCCESS: /generate (Simple)");
        console.log("Response:", res.data.result.substring(0, 50) + "...");
    } catch (e) {
        console.error("FAILED: /generate (Simple)", e.message);
    }

    // 2. Test /generate (Preferences)
    console.log("\nTesting /generate (Preferences)...");
    try {
        const res = await axios.post(`${baseUrl}/generate`, {
            preferences: {
                contentType: "Todo List",
                topic: "Launch a new app",
                audience: "developers",
                platform: "GitHub",
                count: 3
            }
        });
        console.log("SUCCESS: /generate (Preferences)");
        console.log("Response:", JSON.stringify(res.data.result).substring(0, 100) + "...");
    } catch (e) {
        console.error("FAILED: /generate (Preferences)", e.message);
    }

    // 3. Test /council
    console.log("\nTesting /council...");
    try {
        const res = await axios.post(`${baseUrl}/council`, {
            topic: "Should AI replace human writers?",
            personas: ["The Visionary", "The Skeptic"]
        });
        console.log("SUCCESS: /council");
        console.log("Response Type:", Array.isArray(res.data.result) ? "Array" : typeof res.data.result);
        if (res.data.result) {
            console.log("First speaker:", res.data.result[0].speaker);
        }
    } catch (e) {
        console.error("FAILED: /council", e.message);
    }
};

testLocalEndpoints();
