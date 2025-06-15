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
exports.Account = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const accountSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },
    linkedinUrl: {
        type: String,
        required: [true, 'LinkedIn URL is required'],
        validate: {
            validator: function (url) {
                return /^https?:\/\/(www\.)?linkedin\.com\//.test(url);
            },
            message: 'Must be a valid LinkedIn URL',
        },
    },
    currentJobTitle: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
    },
    currentCompany: {
        type: String,
        required: [true, 'Company is required'],
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    summary: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
// Indexes for better query performance
accountSchema.index({ linkedinUrl: 1 }, { unique: true });
accountSchema.index({ firstName: 1, lastName: 1 });
accountSchema.index({ currentJobTitle: 1 });
accountSchema.index({ currentCompany: 1 });
exports.Account = mongoose_1.default.model('Account', accountSchema);
//# sourceMappingURL=Account.js.map