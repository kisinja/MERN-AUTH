// Global Imports
import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';

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
app.use(cors());
app.use(morgan('dev'));

// Routes for Users
app.use("/api/users", user);

// Production Configuration
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
} else {
    // Default Route
    app.get('/', (req, res) => {
        res.send('Server is ready');
    });
}

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