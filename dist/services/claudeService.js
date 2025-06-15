"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePersonalizedMessage = void 0;
const sdk_1 = __importDefault(require("@anthropic-ai/sdk"));
const database_1 = require("../config/database");
const anthropic = new sdk_1.default({
    apiKey: database_1.config.CLAUDE_API_KEY,
});
const createPrompt = (profileData) => `
You are a top-tier B2B copywriter helping **OutFlo**—an early-stage, founder-mentored AI outreach startup in Bangalore—craft LinkedIn connection requests that convert.

🎯 **Prospect details**
• Name: ${profileData.name}
• Job Title: ${profileData.job_title}
• Company: ${profileData.company}
• Location: ${profileData.location}
• Profile Summary: ${profileData.summary}

✍️ **Write ONE message (≤120 words) that:**
1. Speaks in first-person singular (“I”), warm yet professional.  
2. References a single authentic detail about their role or company (use data above, no inventions).  
3. Introduces OutFlo in one sentence as a *next-gen AI tool that helps sales teams book more meetings*—keep it value-oriented, not salesy.  
4. Optionally nods to our early-stage, high-growth spirit (e.g., “lean team mentored by top founders”).  
5. Ends with a gentle CTA such as “Open to connecting?” or “Worth a quick chat?”  
6. Returns **only** the message body (no subject lines, greetings, or commentary).

Generate the final message now.
`.trim();
const extractMessageContent = (message) => {
    if (message?.content?.[0]?.text) {
        return message.content[0].text.trim();
    }
    return "Hi there! I came across your profile and thought OutFlo could help you streamline outreach and book more meetings. Let's connect!";
};
const generatePersonalizedMessage = async (profileData) => {
    try {
        const prompt = createPrompt(profileData);
        const message = await anthropic.messages.create({
            model: database_1.config.CLAUDE_MODEL,
            max_tokens: 300,
            temperature: 0.7,
            messages: [
                {
                    role: 'user',
                    content: prompt,
                },
            ],
        });
        const generatedMessage = extractMessageContent(message);
        return {
            message: generatedMessage,
        };
    }
    catch (error) {
        console.error('Error generating personalized message:', error);
        throw new Error('Failed to generate personalized message');
    }
};
exports.generatePersonalizedMessage = generatePersonalizedMessage;
//# sourceMappingURL=claudeService.js.map