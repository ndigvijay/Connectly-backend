"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePersonalizedMessage = void 0;
const claudeService_1 = require("../services/claudeService");
const generatePersonalizedMessage = async (req, res) => {
    try {
        const { name, job_title, company, location, summary, } = req.body;
        if (!name || !job_title || !company || !location || !summary) {
            res.status(400).json({
                success: false,
                error: 'All fields are required: name, job_title, company, location, summary',
            });
            return;
        }
        if (name.length > 100 ||
            job_title.length > 100 ||
            company.length > 100 ||
            location.length > 100) {
            res.status(400).json({
                success: false,
                error: 'Field values are too long (max 100 characters each)',
            });
            return;
        }
        if (summary.length > 500) {
            res.status(400).json({
                success: false,
                error: 'Summary is too long (max 500 characters)',
            });
            return;
        }
        const profileData = {
            name: name.trim(),
            job_title: job_title.trim(),
            company: company.trim(),
            location: location.trim(),
            summary: summary.trim(),
        };
        const messageResponse = await (0, claudeService_1.generatePersonalizedMessage)(profileData);
        res.status(200).json({
            success: true,
            data: messageResponse,
            message: 'Personalized message generated successfully',
        });
    }
    catch (error) {
        console.error('Error generating personalized message:', error);
        if (error instanceof Error) {
            if (error.message.includes('API key')) {
                res.status(401).json({
                    success: false,
                    error: 'Invalid Claude API key configuration',
                });
                return;
            }
            if (error.message.includes('rate limit')) {
                res.status(429).json({
                    success: false,
                    error: 'Rate limit exceeded. Please try again later.',
                });
                return;
            }
        }
        res.status(500).json({
            success: false,
            error: 'Failed to generate personalized message',
        });
    }
};
exports.generatePersonalizedMessage = generatePersonalizedMessage;
//# sourceMappingURL=messageController.js.map