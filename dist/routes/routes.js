"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const campaignController_1 = require("../controllers/campaignController");
const messageController_1 = require("../controllers/messageController");
const router = express_1.default.Router();
// Welcome route
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Welcome to the OutFlo Campaign Management REST API',
        version: '1.0.0',
        endpoints: {
            campaigns: {
                'GET /campaigns': 'Fetch all campaigns (excluding deleted)',
                'GET /campaigns/:id': 'Fetch a single campaign by ID',
                'POST /campaigns': 'Create a new campaign',
                'PUT /campaigns/:id': 'Update campaign details (including status)',
                'DELETE /campaigns/:id': 'Delete campaign (set status to DELETED)',
            },
            messages: {
                'POST /personalized-message': 'Generate personalized LinkedIn outreach message',
            },
        },
    });
});
// Campaign routes
router.post('/campaigns', campaignController_1.createCampaign);
router.get('/campaigns', campaignController_1.getAllCampaigns);
router.get('/campaigns/:id', campaignController_1.getCampaignById);
router.put('/campaigns/:id', campaignController_1.updateCampaign);
router.delete('/campaigns/:id', campaignController_1.deleteCampaign);
// LinkedIn message generation route
router.post('/personalized-message', messageController_1.generatePersonalizedMessage);
exports.default = router;
//# sourceMappingURL=routes.js.map