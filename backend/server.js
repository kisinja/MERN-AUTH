// Global Imports
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Configuration for dotenv
dotenv.config();

// Local Imports
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { connect_db } from './config/db.js';
import user from './routes/user.js';

// Constants
const port = process.env.PORT || 5000;

// Express App
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes for Users
app.use("/api/users", user);

// Default Route
app.get('/', (req, res) => {
    res.send('Server is ready');
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const start_server = async () => {
    try {
        connect_db();
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    } catch (error) {
        console.log(err.message);
        res.json({ error: err.message }).status(500);
    }
};

start_server();