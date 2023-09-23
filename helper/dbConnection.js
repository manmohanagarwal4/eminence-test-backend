const mongoose = require("mongoose");

const dbConnect = async function () {
    const mongoUrl = 'mongodb+srv://manmohan:1WTy5jJ3EkZmE6HW@cluster0.zg4px0k.mongodb.net/';
    try {
        console.log("Establishing Mongo DB Connection...");
        const x = await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Mongo DB,[${mongoUrl}] Connected :)`);
        return false;
    } catch (error) {
        console.log("==== DB Connection Error ====", error.message);
        throw error;
    }
};

module.exports = { dbConnect };