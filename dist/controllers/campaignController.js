"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCampaign = exports.updateCampaign = exports.getAllCampaigns = exports.getCampaignById = exports.createCampaign = void 0;
const Campaign_1 = require("../models/Campaign");
const mongoose_1 = __importDefault(require("mongoose"));
const createCampaign = async (req, res) => {
    try {
        const { name, description, status, leads, accountIds } = req.body;
        if (!name || !description) {
            res.status(400).json({
                success: false,
                error: 'Name and description are required',
            });
            return;
        }
        if (accountIds && accountIds.length > 0) {
            const invalidIds = accountIds.filter((id) => !mongoose_1.default.Types.ObjectId.isValid(id));
            if (invalidIds.length > 0) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid account IDs provided',
                });
                return;
            }
        }
        const campaign = new Campaign_1.Campaign({
            name,
            description,
            status: status || 'Active',
            leads: leads || [],
            accountIds: accountIds || [],
        });
        const savedCampaign = await campaign.save();
        res.status(201).json({
            success: true,
            data: savedCampaign,
            message: 'Campaign created successfully',
        });
    }
    catch (error) {
        console.error('Error creating campaign:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to create campaign',
        });
    }
};
exports.createCampaign = createCampaign;
const getCampaignById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                error: 'Invalid campaign ID',
            });
            return;
        }
        const campaign = await Campaign_1.Campaign.findById(id).populate('accountIds');
        if (!campaign) {
            res.status(404).json({
                success: false,
                error: 'Campaign not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: campaign,
        });
    }
    catch (error) {
        console.error('Error fetching campaign:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve campaign',
        });
    }
};
exports.getCampaignById = getCampaignById;
const getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign_1.Campaign.find().populate('accountIds');
        res.status(200).json({
            success: true,
            data: campaigns,
            message: `Found ${campaigns.length} campaigns`,
        });
    }
    catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve campaigns',
        });
    }
};
exports.getAllCampaigns = getAllCampaigns;
const updateCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                error: 'Invalid campaign ID',
            });
            return;
        }
        if (updateData.accountIds && updateData.accountIds.length > 0) {
            const invalidIds = updateData.accountIds.filter((accountId) => !mongoose_1.default.Types.ObjectId.isValid(accountId));
            if (invalidIds.length > 0) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid account IDs provided',
                });
                return;
            }
        }
        const updatedCampaign = await Campaign_1.Campaign.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        }).populate('accountIds');
        if (!updatedCampaign) {
            res.status(404).json({
                success: false,
                error: 'Campaign not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: updatedCampaign,
            message: 'Campaign updated successfully',
        });
    }
    catch (error) {
        console.error('Error updating campaign:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update campaign',
        });
    }
};
exports.updateCampaign = updateCampaign;
const deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({
                success: false,
                error: 'Invalid campaign ID',
            });
            return;
        }
        const deletedCampaign = await Campaign_1.Campaign.findByIdAndUpdate(id, { status: 'Deleted' }, { new: true });
        if (!deletedCampaign) {
            res.status(404).json({
                success: false,
                error: 'Campaign not found',
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: deletedCampaign,
            message: 'Campaign deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting campaign:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete campaign',
        });
    }
};
exports.deleteCampaign = deleteCampaign;
//# sourceMappingURL=campaignController.js.map