import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';

const connect_db = asyncHandler(async (req, res) => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log("Database Connected Successfully !!"))
        .catch((err) => {
            console.log(`Error: ${err.message}`);
        });
});

export { connect_db };