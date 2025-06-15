"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Campaign = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const campaignSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Campaign name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Campaign description is required'],
        trim: true,
    },
    status: {
        type: String,
        enum: {
            values: ['Active', 'Inactive', 'Deleted'],
            message: 'Status must be Active, Inactive, or Deleted',
        },
        default: 'Active',
    },
    leads: [
        {
            type: String,
            validate: {
                validator: function (url) {
                    return /^https?:\/\/(www\.)?linkedin\.com\//.test(url);
                },
                message: 'Must be a valid LinkedIn URL',
            },
        },
    ],
    accountIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Account',
        },
    ],
}, {
    timestamps: true,
});
// Index for better query performance
campaignSchema.index({ status: 1 });
campaignSchema.index({ name: 1 });
// Don't return deleted campaigns in normal queries
campaignSchema.pre(/^find/, function () {
    if (!this.getOptions().includeDeleted) {
        this.find({ status: { $ne: 'Deleted' } });
    }
});
exports.Campaign = mongoose_1.default.model('Campaign', campaignSchema);
//# sourceMappingURL=Campaign.js.map