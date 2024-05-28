import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc  Auth user/ Get token
// @route POST /api/users/auth
// @access Public
// async handler is a middleware that wraps around an async function and catches any errors that the function throws. we don't need to use try catch block
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc  Register a new user
// @route POST /api/users
// @access Public
// async handler is a middleware that wraps around an async function and catches any errors that the function throws. we don't need to use try catch block
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        username,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc  Logout User
// @route POST /api/users/logout
// @access Public
// async handler is a middleware that wraps around an async function and catches any errors that the function throws. we don't need to use try catch block
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        expires: new Date(0), // expires right away
        httpOnly: true
    })
    res.status(200).json({ message: "User Logged Out" });
});

// @desc  Get user profile
// @route GET /api/users/profile
// @access Private
// async handler is a middleware that wraps around an async function and catches any errors that the function throws. we don't need to use try catch block
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email
    }
    res.status(200).json(user);
});

// @desc  Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username; // if req.body.username is undefined, then use the current username
        user.email = req.body.email || user.email; // if req.body.email is undefined, then use the current email

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers
};