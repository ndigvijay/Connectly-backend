"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.connectToMongo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI;
const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
if (!MONGO_URI) {
    throw new Error('MONGO_URI environment variable is required');
}
if (!CLAUDE_API_KEY) {
    throw new Error('CLAUDE_API_KEY environment variable is required');
}
const connectToMongo = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
exports.connectToMongo = connectToMongo;
exports.config = {
    MONGO_URI,
    CLAUDE_API_KEY,
    CLAUDE_MODEL: process.env.CLAUDE_MODEL || 'claude-3-5-sonnet-20241022',
    PORT: process.env.PORT || 6969,
};
//# sourceMappingURL=database.js.map