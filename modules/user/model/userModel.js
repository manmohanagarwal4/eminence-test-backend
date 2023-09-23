const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName: { type: String, default: '' },
    password: { type: String, default: '' },
    isLogin: { type: Boolean, default: false },

    createdAt: Number,
    updatedAt: Number
}, { timestamps: true });

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
