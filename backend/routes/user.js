import express from 'express';
import {
    authUser, registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers
} from '../controllers/user.js';
import { protect, admin } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router.get("/", protect, admin, getUsers);
router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);


export default router;