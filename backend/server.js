import express from 'express';
import dotenv from 'dotenv';
import user from './routes/user.js';

dotenv.config();
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { connect_db } from './config/db.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", user);

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.use(notFound);
app.use(errorHandler);

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